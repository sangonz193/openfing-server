import { SafeOmit } from "@sangonz193/utils/SafeOmit"
import * as yup from "yup"

import { RequestContext } from "../../../../context/RequestContext"
import { CourseClassRow } from "../../../../database/CourseClass/CourseClass.entity.types"
import { CourseClassLiveStateRow } from "../../../../database/CourseClassLiveState/CourseClassLiveState.entity.types"
import { Repositories } from "../../../../database/repositories"
import { getCourseClassFromRef } from "../../_utils/getCourseClassFromRef"
import { getGenericErrorParent } from "../../GenericError/GenericError.parent"
import { MutationSetCourseClassLiveStateArgs, SetCourseClassLiveStateInput } from "../../schemas.types"
import { getSetCourseClassLiveStatePayloadParent } from "./SetCourseClassLiveStatePayload.parent"

export async function setCourseClassLiveState(
	input: SetCourseClassLiveStateInput,
	context: RequestContext & Required<Pick<RequestContext, "user">>
) {
	const { repositories, dataLoaders } = context

	const validatedDataPromise = yup
		.object<
			yup.SchemaOf<
				SafeOmit<Extract<typeof input["data"], {}>, "startDate"> & {
					startDate: Date | null | undefined
				}
			>["fields"]
		>({
			html: yup.string().nullable(),
			inProgress: yup.boolean().nullable(),
			startDate: yup.date().nullable(),
		})
		.nullable(true)
		.validate(input.data)

	let validatedData: typeof validatedDataPromise extends Promise<infer T> ? T : unknown
	try {
		validatedData = await validatedDataPromise
	} catch (e: unknown) {
		console.log(e)
		return getGenericErrorParent()
	}

	const courseClass = await getCourseClassFromRef(
		input.courseClassRef,
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

	const prevCourseClassLiveState =
		await dataLoaders.courseClassLiveState.findCourseClassLiveStateByCourseClassId.load(courseClass.id)
	if (prevCourseClassLiveState?.course_class_id) {
		repositories.courseClassLiveState.deleteCourseClassLiveStateByCourseClassId({
			courseClassId: prevCourseClassLiveState.course_class_id,
		})
	}

	if (prevCourseClassLiveState && !validatedData) {
		return getSetCourseClassLiveStatePayloadParent(undefined)
	} else if (validatedData) {
		const courseClassLiveState = await createCourseClassLiveState(
			repositories,
			courseClass,
			validatedData,
			prevCourseClassLiveState
		)

		return getSetCourseClassLiveStatePayloadParent(courseClassLiveState)
	}

	return getGenericErrorParent()
}

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
