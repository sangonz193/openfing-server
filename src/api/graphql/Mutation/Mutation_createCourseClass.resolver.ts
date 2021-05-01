import * as yup from "yup";

import { SafeOmit } from "../../../_utils/SafeOmit";
import { backupDb } from "../../../modules/backup-db/backupDb";
import { getResolutionFromVideoUrl } from "../../../modules/miscellaneous/getResolutionFromVideoUrl";
import { getCourseClassListFromRef } from "../_utils/getCourseClassListFromRef";
import { getDbCommonVisibilityValue } from "../_utils/getDbCommonVisibilityValue";
import { getUserFromSecret } from "../_utils/getUserFromSecret";
import { getAuthenticationErrorParent } from "../AuthenticationError/AuthenticationError.parent";
import { getCreateCourseClassPayloadParent } from "../CreateCourseClassPayload/CreateCourseClassPayload.parent";
import { getGenericErrorParent } from "../GenericError/GenericError.parent";
import { MutationCreateCourseClassArgs, Resolvers } from "../schemas.types";

const resolver: Resolvers["Mutation"]["createCourseClass"] = async (_, args, context) => {
	const user = await getUserFromSecret(args.secret, context);

	if (!user) {
		return getAuthenticationErrorParent();
	}

	const { dataLoaders, repositories } = context;

	const validatedDataPromise = yup
		.object<yup.SchemaOf<SafeOmit<MutationCreateCourseClassArgs["input"], "courseClassListRef">>["fields"]>({
			name: yup.string().trim().max(200).required(),
			number: yup.number().moreThan(0).lessThan(1000).required(),
			visibility: yup.mixed().nullable(),
		})
		.required()
		.validate(args.input);

	let validatedData: typeof validatedDataPromise extends Promise<infer T> ? T : unknown;
	try {
		validatedData = await validatedDataPromise;
	} catch (e) {
		console.log(e);
		return getGenericErrorParent();
	}

	const courseClassList = await getCourseClassListFromRef(
		args.input.courseClassListRef,
		{
			includeDisabled: true,
			includeHidden: true,
		},
		context
	);

	if (!courseClassList) {
		console.log("course class list not found");
		return getGenericErrorParent();
	}

	const courseClasses = await repositories.courseClass.findAll({
		courseClassListId: courseClassList.id,
		includeDisabled: true,
		includeHidden: true,
	});

	const courseClassWithSameNumber = courseClasses.find((courseClass) => courseClass.number === validatedData.number);

	if (courseClassWithSameNumber) {
		console.log("course class with same number found");
		return getGenericErrorParent();
	}

	const courseClass = await repositories.courseClass.insert(
		repositories.courseClass.create({
			created_by_id: user.id,
			course_class_list_id: courseClassList.id,
			name: validatedData.name,
			published_at: new Date(),
			visibility: getDbCommonVisibilityValue(validatedData.visibility || "PUBLIC"),
			number: validatedData.number,
		})
	);
	// TODO: necessary?
	dataLoaders.courseClass.clearAll();

	await backupDb(context.ormConnection);

	const baseVideoUrl = courseClassList.code
		? `https://openfing-video.fing.edu.uy/media/${courseClassList.code}/${
				courseClassList.code
		  }_${validatedData.number.toString().padStart(2, "0")}`
		: undefined;
	const possibleFormatNames = ["webm", "mp4"];

	const videoResolutions: Array<{
		formats: Array<{ url: string; name: string }>;
		height: number;
		width: number;
	}> = [];

	await Promise.all(
		possibleFormatNames.map(async (formatName) => {
			if (!baseVideoUrl) {
				return;
			}

			const url = `${baseVideoUrl}.${formatName}`;
			const resolution = await getResolutionFromVideoUrl(url);

			if (resolution) {
				const quality = videoResolutions.find((q) => q.height === resolution.height);
				const format = {
					url,
					name: formatName,
				};

				if (quality) {
					quality.formats.push(format);
				} else {
					videoResolutions.push({
						height: resolution.height,
						width: resolution.width,
						formats: [format],
					});
				}
			}
		})
	);

	if (videoResolutions.length > 0) {
		const courseClassVideo = await repositories.courseClassVideo.save(
			repositories.courseClassVideo.create({
				course_class_id: courseClass.id,
				created_by_id: user.id,
				name: "Clase",
				position: 1,
				visibility: "public",
			})
		);
		// TODO: necessary?
		dataLoaders.courseClassVideo.clearAll();

		const courseClassVideoQuality = await repositories.courseClassVideoQuality.save(
			repositories.courseClassVideoQuality.create({
				course_class_video_id: courseClassVideo.id,
				created_by_id: user.id,
				height: null,
				width: null,
			})
		);
		// TODO: necessary?
		dataLoaders.courseClassVideoQuality.clearAll();

		await Promise.all(
			videoResolutions.map(async (videoResolution) => {
				await Promise.all(
					videoResolution.formats.map(async (videoFormat) => {
						await repositories.courseClassVideoFormat.createAndInsert({
							course_class_video_quality_id: courseClassVideoQuality.id,
							created_by_id: user.id,
							name: videoFormat.name,
							url: videoFormat.url,
						});
						// TODO: necessary?
						dataLoaders.courseClassVideoFormat.clearAll();
					})
				);
			})
		);
	}

	return getCreateCourseClassPayloadParent({
		courseClass,
	});
};

export default resolver;
