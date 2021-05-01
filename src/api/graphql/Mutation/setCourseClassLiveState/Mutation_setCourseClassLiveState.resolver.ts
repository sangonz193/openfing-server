import { Connection } from "typeorm";
import * as yup from "yup";

import { SafeOmit } from "../../../../_utils/SafeOmit";
import { CourseClassRow } from "../../../../database/CourseClass/CourseClass.entity.types";
import { CourseClassLiveStateRow } from "../../../../database/CourseClassLiveState/CourseClassLiveState.entity.types";
import { deleteCourseClassLiveStateByCourseClassId } from "../../../../database/CourseClassLiveState/deleteCourseClassLiveStateByCourseClassId";
import { insertCourseClassLiveState } from "../../../../database/CourseClassLiveState/insertCourseClassLiveState";
import { backupDb } from "../../../../modules/backup-db/backupDb";
import { getCourseClassFromRef } from "../../_utils/getCourseClassFromRef";
import { getUserFromSecret } from "../../_utils/getUserFromSecret";
import { getAuthenticationErrorParent } from "../../AuthenticationError/AuthenticationError.parent";
import { getGenericErrorParent } from "../../GenericError/GenericError.parent";
import { MutationSetCourseClassLiveStateArgs, Resolvers } from "../../schemas.types";
import { getSetCourseClassLiveStatePayloadParent } from "./SetCourseClassLiveStatePayload.parent";

const resolver: Resolvers["Mutation"]["setCourseClassLiveState"] = async (_, args, context) => {
	const user = await getUserFromSecret(args.secret, context);
	if (!user) {
		return getAuthenticationErrorParent();
	}

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
		return getGenericErrorParent();
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
		return getGenericErrorParent();
	}

	const prevCourseClassLiveState = await dataLoaders.courseClassLiveStateByCourseClassId.load(courseClass.id);
	if (prevCourseClassLiveState?.course_class_id) {
		deleteCourseClassLiveStateByCourseClassId(ormConnection, prevCourseClassLiveState.course_class_id);
	}

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
