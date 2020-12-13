import { identity } from "lodash";
import path from "path";
import SFTP from "ssh2-promise/dist/sftp";
import * as yup from "yup";

import { getDbCommonVisibilityValue } from "../../_helpers/getDbCommonVisibilityValue";
import { getOpenFingVideoSftpConnection } from "../../_helpers/getOpenFingVideoSftpConnection";
import { dangerousKeysOf } from "../../_utils/dangerousKeysOf";
import { CourseClassVideoRow } from "../../entities/CourseClassVideo/CourseClassVideo.entity.types";
import { CourseClassVideoFormatRow } from "../../entities/CourseClassVideoFormat/CourseClassVideoFormat.entity.types";
import {
	MutationUpdateCourseClassArgs,
	Resolvers,
	UpdateCourseClassInputVisibility,
} from "../../generated/graphql.types";
import { getAuthenticationError } from "../_utils/getAuthenticationError";
import { getCourseClassFromRef } from "../_utils/getCourseClassFromRef";
import { getCourseClassVideoFileName } from "../_utils/getCourseClassVideoFileName";
import { getNotFoundError } from "../_utils/getNotFoundError";
import { getUserFromSecret } from "../_utils/getUserFromSecret";
import { getUpdateCourseClassPayload } from "../UpdateCourseClassPayload/UpdateCourseClassPayload.parent";

const resolver: Resolvers["Mutation"]["updateCourseClass"] = async (_, args, context) => {
	const { repositories, dataLoaders } = context;

	const user = await getUserFromSecret(args.secret, context);
	if (!user) return getAuthenticationError();

	const courseClass = await getCourseClassFromRef(
		args.ref,
		{
			includeHidden: true,
			includeDisabled: true,
		},
		context
	);
	if (!courseClass) return getNotFoundError();

	const validatedData = await yup
		.object<
			{
				[K in keyof MutationUpdateCourseClassArgs["input"]]: Exclude<
					MutationUpdateCourseClassArgs["input"][K],
					null
				>;
			}
		>({
			name: yup.string().trim().max(200).notRequired(),
			number: yup.number().moreThan(0).lessThan(1000).notRequired(),
			visibility: yup
				.string()
				.oneOf(
					dangerousKeysOf(
						identity<{ [T in UpdateCourseClassInputVisibility]: "" }>({
							DISABLED: "",
							HIDDEN: "",
							PUBLIC: "",
						})
					)
				)
				.notRequired(),
		})
		.required()
		.validate(args.input);

	const updatedCourseClass = await repositories.courseClass.update(courseClass.id, {
		updated_by_id: user.id,
		name: validatedData.name,
		number: validatedData.number,
		visibility: validatedData.visibility && getDbCommonVisibilityValue(validatedData.visibility),
	});

	const openFingVideoServerUrl = "https://openfing-video.fing.edu.uy";

	const renameVideoFile = async (options: {
		from: string;
		to: string;
		courseClassVideoFormatId: CourseClassVideoFormatRow["id"];
		sftp: SFTP;
	}) => {
		await Promise.all([
			await repositories.courseClassVideoFormat.update(options.courseClassVideoFormatId, {
				url: openFingVideoServerUrl + options.to,
				updated_by_id: user.id,
			}),
			options.sftp.rename(options.from, options.to),
		]);
	};

	const getVideosData = async () => {
		const getQualities = async (id: CourseClassVideoRow["id"]) => {
			return Promise.all(
				(
					await repositories.courseClassVideoQuality.findAll({
						courseClassVideoId: id,
					})
				).map(async (quality) => {
					return {
						...quality,
						formats: await repositories.courseClassVideoFormat.findAll({
							courseClassVideoQualityId: quality.id,
						}),
					};
				})
			);
		};

		return await Promise.all(
			(
				await repositories.courseClassVideo.findAll({
					courseClassId: courseClass.id,
					includeDisabled: true,
					includeHidden: true,
				})
			).map(async (video) => {
				return {
					...video,
					qualities: await getQualities(video.id),
				};
			})
		);
	};

	const getCourseClassListCode = async () => {
		const { course_class_list_id } = updatedCourseClass;
		if (!course_class_list_id) return null;

		return (
			await dataLoaders.courseClassList.load({
				id: course_class_list_id,
				includeDisabled: true,
				includeHidden: true,
			})
		)?.code;
	};

	const [videos, openFingVideoSftp, courseClassListCode] = await Promise.all([
		getVideosData(),
		getOpenFingVideoSftpConnection(),
		getCourseClassListCode(),
	]);

	if (openFingVideoSftp && courseClassListCode)
		await Promise.all(
			videos.map(async (video, videoIndex) => {
				await Promise.all(
					video.qualities.map(async (quality, qualityIndex) => {
						await Promise.all(
							quality.formats.map(async (format) => {
								const videoFilePath = format.url?.split(openFingVideoServerUrl.substr(-10))[1];
								if (!videoFilePath) return;

								const fileExists = !!(await openFingVideoSftp?.lstat(videoFilePath).catch(() => false));
								if (!fileExists) {
									console.log(`Won't rename: File does not exist: ${videoFilePath}`);
									return;
								}

								const newVideoFileName = await getCourseClassVideoFileName({
									courseClass: updatedCourseClass,
									courseClassListCode,
									format,
									quality,
									video,
									qualityIndex,
									videoIndex,
								});

								if (!newVideoFileName) {
									console.log(`Could not get new name for courseClass ${courseClass.id}`);
									return;
								}

								const newVideoFilePath = path.posix.resolve(videoFilePath, "..", newVideoFileName);

								if (newVideoFilePath !== videoFilePath)
									await renameVideoFile({
										from: videoFilePath,
										to: newVideoFilePath,
										courseClassVideoFormatId: format.id,
										sftp: openFingVideoSftp,
									});
							})
						);
					})
				);
			})
		);

	return getUpdateCourseClassPayload({
		courseClass: updatedCourseClass,
	});
};

export default resolver;
