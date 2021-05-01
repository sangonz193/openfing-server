import { Connection } from "typeorm";
import * as yup from "yup";

import { backupDb } from "../../_helpers/backupDb";
import { SafeOmit } from "../../_utils/utilTypes";
import { CourseClassRow } from "../../entities/CourseClass/CourseClass.entity.types";
import { CourseClassLiveStateRow } from "../../entities/CourseClassLiveState/CourseClassLiveState.entity.types";
import { deleteCourseClassLiveStateByCourseClassId } from "../../entities/CourseClassLiveState/deleteCourseClassLiveStateByCourseClassId";
import { insertCourseClassLiveState } from "../../entities/CourseClassLiveState/insertCourseClassLiveState";
import { MutationSetCourseClassLiveStateArgs, Resolvers } from "../../generated/graphql.types";
import { getAuthenticationError } from "../_utils/getAuthenticationError";
import { getCourseClassFromRef } from "../_utils/getCourseClassFromRef";
import { getGenericError } from "../_utils/getGenericError";
import { getUserFromSecret } from "../_utils/getUserFromSecret";
import { getSetCourseClassLiveStatePayloadParent } from "../SetCourseClassLiveStatePayload/SetCourseClassLiveStatePayload.parent";

const resolver: Resolvers["Mutation"]["setCourseClassLiveState"] = async (_, args, context) => {
	const user = await getUserFromSecret(args.secret, context);
	if (!user) return getAuthenticationError();

	const { dataLoaders, ormConnection } = context;

	const validatedDataPromise = yup
		.object<
			yup.SchemaOf<
				SafeOmit<Extract<typeof args["input"]["data"], {}>, "startDate"> & {
					startDate: Date | null | undefined;
				}
			>["fields"]
		>({
			html: yup.string().nullable(),
			inProgress: yup.boolean().nullable(),
			startDate: yup.date().nullable(),
		})
		.required()
		.validate(args.input.data);

	let validatedData: typeof validatedDataPromise extends Promise<infer T> ? T : unknown;
	try {
		validatedData = await validatedDataPromise;
	} catch (e) {
		console.log(e);
		return getGenericError();
	}

	const courseClass = await getCourseClassFromRef(
		args.input.courseClassRef,
		{
			includeDisabled: true,
			includeHidden: true,
		},
		context
	);

	if (!courseClass) {
		console.log("course class not found");
		return getGenericError();
	}

	const prevCourseClassLiveState = await dataLoaders.courseClassLiveStateByCourseClassId.load(courseClass.id);
	if (prevCourseClassLiveState?.course_class_id)
		deleteCourseClassLiveStateByCourseClassId(ormConnection, prevCourseClassLiveState.course_class_id);

	const courseClassLiveState = await createCourseClassLiveState(
		ormConnection,
		courseClass,
		validatedData,
		prevCourseClassLiveState
	);
	dataLoaders.courseClassLiveStateByCourseClassId.clearAll();
	// TODO: necessary?

	await backupDb(context.ormConnection);

	return getSetCourseClassLiveStatePayloadParent({
		courseClassLiveState,
	});
};

export default resolver;

async function createCourseClassLiveState(
	ormConnection: Connection,
	courseClass: CourseClassRow,
	validatedData: SafeOmit<Extract<MutationSetCourseClassLiveStateArgs["input"]["data"], {}>, "startDate"> & {
		startDate: Date | null | undefined;
	},
	prevCourseClassLiveState: CourseClassLiveStateRow | null
) {
	return await insertCourseClassLiveState(ormConnection, {
		course_class_id: courseClass.id,
		html: validatedData.html === null ? null : validatedData.html ?? prevCourseClassLiveState?.html ?? null,
		in_progress:
			validatedData.inProgress === null
				? null
				: validatedData.inProgress ?? prevCourseClassLiveState?.in_progress ?? false,
		start_date:
			validatedData.startDate === null
				? null
				: (validatedData.startDate ? validatedData.startDate : null) ??
				  prevCourseClassLiveState?.start_date ??
				  null,
	});
}
