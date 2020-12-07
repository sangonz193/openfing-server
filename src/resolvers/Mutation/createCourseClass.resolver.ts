import * as yup from "yup";

import { getAuthenticationError } from "../_utils/getAuthenticationError";
import { getCourseClassListFromRef } from "../_utils/getCourseClassListFromRef";
import { getGenericError } from "../_utils/getGenericError";
import { getUserFromSecret } from "../_utils/getUserFromSecret";
import { backupDb } from "../../_helpers/backupDb";
import { getDbCommonVisibilityValue } from "../../_helpers/getDbCommonVisibilityValue";
import { getResolutionFromVideoUrl } from "../../_helpers/getResolutionFromVideoUrl";
import { dangerousKeysOf } from "../../_utils/dangerousKeysOf";
import { identityMap } from "../../_utils/identityMap";
import { SafeOmit } from "../../_utils/utilTypes";
import { MutationCreateCourseClassArgs, Resolvers } from "../../generated/graphql.types";
import { getCreateCourseClassPayloadParent } from "../CreateCourseClassPayload/CreateCourseClassPayload.parent";

const resolver: Resolvers["Mutation"]["createCourseClass"] = async (_, args, context) => {
	const user = await getUserFromSecret(args.secret, context);

	if (!user) return getAuthenticationError();

	const { dataLoaders, repositories } = context;

	const validatedDataPromise = yup
		.object<SafeOmit<MutationCreateCourseClassArgs["input"], "courseClassListRef">>({
			name: yup.string().trim().max(200).required(),
			number: yup.number().moreThan(0).lessThan(1000).required(),
			visibility: yup.string().oneOf<Exclude<MutationCreateCourseClassArgs["input"]["visibility"], null>>(
				dangerousKeysOf(
					identityMap<Exclude<MutationCreateCourseClassArgs["input"]["visibility"], null | undefined>>({
						DISABLED: "",
						HIDDEN: "",
						PUBLIC: "",
					})
				)
			),
		})
		.required()
		.validate(args.input);

	let validatedData: typeof validatedDataPromise extends Promise<infer T> ? T : unknown;
	try {
		validatedData = await validatedDataPromise;
	} catch (e) {
		console.log(e);
		return getGenericError();
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
		return getGenericError();
	}

	const courseClasses = await repositories.courseClass.findAll({
		courseClassListId: courseClassList.id,
		includeDisabled: true,
		includeHidden: true,
	});

	const courseClassWithSameNumber = courseClasses.find((courseClass) => courseClass.number === validatedData.number);

	if (courseClassWithSameNumber) {
		console.log("course class with same number found");
		return getGenericError();
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

	const baseVideoUrl = `https://openfing-video.fing.edu.uy/media/${courseClassList.code}/${
		courseClassList.code
	}_${validatedData.number.toString().padStart(2, "0")}`;
	const possibleFormatNames = ["webm", "mp4"];

	const videoResolutions: Array<{
		formats: Array<{ url: string; name: string }>;
		height: number;
		width: number;
	}> = [];

	await Promise.all(
		possibleFormatNames.map(async (formatName) => {
			const url = `${baseVideoUrl}.${formatName}`;
			const resolution = await getResolutionFromVideoUrl(url);

			if (resolution) {
				const quality = videoResolutions.find((q) => q.height === resolution.height);
				const format = {
					url,
					name: formatName,
				};

				if (quality) quality.formats.push(format);
				else
					videoResolutions.push({
						height: resolution.height,
						width: resolution.width,
						formats: [format],
					});
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
