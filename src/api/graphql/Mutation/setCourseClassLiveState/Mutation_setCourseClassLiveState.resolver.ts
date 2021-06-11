import { SafeOmit } from "@sangonz193/utils/SafeOmit"
import * as yup from "yup"

import { CourseClassRow } from "../../../../database/CourseClass/CourseClass.entity.types"
import { CourseClassLiveStateRow } from "../../../../database/CourseClassLiveState/CourseClassLiveState.entity.types"
import { Repositories } from "../../../../database/repositories"
import { backup } from "../../../../modules/backup/backup"
import { RequestContext } from "../../../RequestContext"
import { getCourseClassFromRef } from "../../_utils/getCourseClassFromRef"
import { getGenericErrorParent } from "../../GenericError/GenericError.parent"
import { withUserFromSecret } from "../../middlewares/withUserFromSecret"
import {
	MutationSetCourseClassLiveStateArgs,
	RequireFields,
	ResolverFn,
	ResolversParentTypes,
	ResolversTypes,
} from "../../schemas.types"
import { getSetCourseClassLiveStatePayloadParent } from "./SetCourseClassLiveStatePayload.parent"

const resolver: ResolverFn<
	ResolversTypes["SetCourseClassLiveStateResult"],
	ResolversParentTypes["Mutation"],
	RequestContext & Required<Pick<RequestContext, "user">>,
	RequireFields<MutationSetCourseClassLiveStateArgs, "input" | "secret">
> = async (_, args, context) => {
	const { repositories, dataLoaders } = context

	const validatedDataPromise = yup
		.object<
			yup.SchemaOf<
				SafeOmit<Extract<typeof args["input"]["data"], {}>, "startDate"> & {
					startDate: Date | null | undefined
				}
			>["fields"]
		>({
			html: yup.string().nullable(),
			inProgress: yup.boolean().nullable(),
			startDate: yup.date().nullable(),
		})
		.nullable(true)
		.validate(args.input.data)

	let validatedData: typeof validatedDataPromise extends Promise<infer T> ? T : unknown
	try {
		validatedData = await validatedDataPromise
	} catch (e: unknown) {
		console.log(e)
		return getGenericErrorParent()
	}

	const courseClass = await getCourseClassFromRef(
		args.input.courseClassRef,
		{
			includeDisabled: true,
			includeHidden: true,
		},
		context
	)

	if (!courseClass) {
		console.log("course class not found")
		return getGenericErrorParent()
	}

	const prevCourseClassLiveState = await dataLoaders.courseClassLiveState.findCourseClassLiveStateByCourseClassId.load(
		courseClass.id
	)
	if (prevCourseClassLiveState?.course_class_id) {
		repositories.courseClassLiveState.deleteCourseClassLiveStateByCourseClassId({
			courseClassId: prevCourseClassLiveState.course_class_id,
		})
	}

	if (validatedData) {
		const courseClassLiveState = await createCourseClassLiveState(
			repositories,
			courseClass,
			validatedData,
			prevCourseClassLiveState
		)
		await backup()

		return getSetCourseClassLiveStatePayloadParent(courseClassLiveState)
	}

	return getGenericErrorParent()
}

export default withUserFromSecret(resolver)

async function createCourseClassLiveState(
	repositories: Repositories,
	courseClass: CourseClassRow,
	validatedData: SafeOmit<Extract<MutationSetCourseClassLiveStateArgs["input"]["data"], {}>, "startDate"> & {
		startDate: Date | null | undefined
	},
	prevCourseClassLiveState: CourseClassLiveStateRow | null
) {
	return repositories.courseClassLiveState.insertCourseClassLiveState({
		data: {
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
		},
	})
}
