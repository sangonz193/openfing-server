import { identity } from "lodash";
import path from "path";
import SFTP from "ssh2-promise/dist/sftp";
import * as yup from "yup";

import { getAuthenticationError } from "../_utils/getAuthenticationError";
import { getCourseClassFromRef } from "../_utils/getCourseClassFromRef";
import { getNotFoundError } from "../_utils/getNotFoundError";
import { getUserFromSecret } from "../_utils/getUserFromSecret";
import { getDbCommonVisibilityValue } from "../../_helpers/getDbCommonVisibilityValue";
import { getOpenFingVideoSftpConnection } from "../../_helpers/getOpenFingVideoSftpConnection";
import { dangerousKeysOf } from "../../_utils/dangerousKeysOf";
import { getUuid } from "../../_utils/getUuid";
import { CourseClassVideoFormatRow } from "../../entities/CourseClassVideoFormat/CourseClassVideoFormat.entity.types";
import {
	MutationUpdateCourseClassArgs,
	Resolvers,
	UpdateCourseClassInputVisibility,
} from "../../generated/graphql.types";
import { getUpdateCourseClassPayload } from "../UpdateCourseClassPayload/UpdateCourseClassPayload.parent";

const resolver: Resolvers["Mutation"]["updateCourseClass"] = async (_, args, context) => {
	const { repositories } = context;

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

	const getVideoFormats = async () => {
		const classVideos = await repositories.courseClassVideo.findAll({
			courseClassId: courseClass.id,
			includeDisabled: true,
			includeHidden: true,
		});
		const classVideoQualities = await Promise.all(
			classVideos.map((video) =>
				repositories.courseClassVideoQuality.findAll({
					courseClassVideoId: video.id,
				})
			)
		);
		const classVideoFormats = await Promise.all(
			classVideoQualities.map((videoQualityGroup) =>
				Promise.all(
					videoQualityGroup.map((videoQuality) =>
						repositories.courseClassVideoFormat.findAll({
							courseClassVideoQualityId: videoQuality.id,
						})
					)
				)
			)
		);

		return classVideoFormats;
	};

	if (validatedData.visibility === "DISABLED") {
		if (courseClass.visibility !== "disabled") {
			const [classVideoFormats, openFingVideoSftp] = await Promise.all([
				getVideoFormats(),
				getOpenFingVideoSftpConnection(),
			]);
			const renamingPromises: Array<Promise<void>> = [];

			if (openFingVideoSftp)
				classVideoFormats.forEach((classVideos) => {
					classVideos.forEach((classVideoQualities) => {
						classVideoQualities.forEach((classVideoFormat) => {
							const videoFilePath = classVideoFormat.url?.split(openFingVideoServerUrl.substr(-10))[1];
							if (!videoFilePath) return;

							renamingPromises.push(
								(async () => {
									const fileExists = !!(await openFingVideoSftp
										?.lstat(videoFilePath)
										.catch(() => false));
									if (!fileExists) return;

									const fileExtension = path.posix.extname(videoFilePath);
									const newFilePath = path.posix.resolve(
										videoFilePath,
										"..",
										getUuid() + fileExtension
									);

									await renameVideoFile({
										from: videoFilePath,
										to: newFilePath,
										courseClassVideoFormatId: classVideoFormat.id,
										sftp: openFingVideoSftp,
									});
								})()
							);
						});
					});
				});

			await Promise.all(renamingPromises);
		}
	} else if (validatedData.visibility !== undefined)
		if (courseClass.visibility === "disabled") {
			const [classVideoFormats, openFingVideoSftp] = await Promise.all([
				getVideoFormats(),
				getOpenFingVideoSftpConnection(),
			]);
			const renamingPromises: Array<Promise<void>> = [];

			if (openFingVideoSftp)
				classVideoFormats.forEach((classVideos, videoIndex) => {
					classVideos.forEach((classVideoQualities, videoQualityIndex) => {
						classVideoQualities.forEach((classVideoFormat) => {
							const videoFilePath = classVideoFormat.url?.split(openFingVideoServerUrl.substr(-10))[1];
							if (!videoFilePath) return;

							renamingPromises.push(
								(async () => {
									const fileExists = !!(await openFingVideoSftp
										?.lstat(videoFilePath)
										.catch(() => false));
									if (!fileExists || typeof updatedCourseClass.number !== "number") return;

									const fileExtension = path.posix.extname(videoFilePath);
									const newFilePath = path.posix.resolve(
										videoFilePath,
										"..",
										path.posix.basename(path.posix.resolve(videoFilePath, "..")) +
											"_" +
											updatedCourseClass.number.toString().padStart(2, "0") +
											(videoIndex > 0 || videoQualityIndex > 0
												? "_" +
												  videoIndex.toString().padStart(2, "0") +
												  "_" +
												  videoQualityIndex.toString().padStart(2, "0")
												: "") +
											fileExtension
									);

									await renameVideoFile({
										from: videoFilePath,
										to: newFilePath,
										courseClassVideoFormatId: classVideoFormat.id,
										sftp: openFingVideoSftp,
									});
								})()
							);
						});
					});
				});

			await Promise.all(renamingPromises);
		}

	return getUpdateCourseClassPayload({
		courseClass: updatedCourseClass,
	});
};

export default resolver;
