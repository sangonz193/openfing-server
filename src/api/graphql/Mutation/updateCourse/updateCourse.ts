import * as yup from "yup"

import { RequestContext } from "../../../../context/RequestContext"
import { getCourseFromRef } from "../../_utils/getCourseFromRef"
import { getDbCommonVisibilityValue } from "../../_utils/getDbCommonVisibilityValue"
import { getGenericErrorParent } from "../../GenericError/GenericError.parent"
import { getNotFoundErrorParent } from "../../NotFoundError/NotFoundError.parent"
import { CourseRef, MutationUpdateCourseArgs, UpdateCourseInput } from "../../schemas.types"
import { getUpdateCoursePayload } from "./UpdateCoursePayload.parent"

export async function updateCourse(
	courseRef: CourseRef,
	input: UpdateCourseInput,
	context: RequestContext & Required<Pick<RequestContext, "user">>
) {
	const { repositories, dataLoaders, user } = context

	const course = await getCourseFromRef(
		courseRef,
		{
			includeHidden: true,
			includeDisabled: true,
		},
		context
	)

	if (!course) {
		return getNotFoundErrorParent()
	}

	const validatedData = await yup
		.object<
			yup.SchemaOf<{
				[K in keyof MutationUpdateCourseArgs["input"]]: Exclude<MutationUpdateCourseArgs["input"][K], null>
			}>["fields"]
		>({
			code: yup.string().trim().max(20).notRequired(),
			eva: yup.string().trim().max(300),
			name: yup.string().trim().max(200).notRequired(),
			visibility: yup.mixed().nullable().nullable().notRequired(),
		})
		.required()
		.validate(input)

	if (validatedData.code) {
		const courseWithSameCode = await dataLoaders.course.load({
			code: validatedData.code,
			includeDisabled: true,
			includeHidden: true,
		})

		if (courseWithSameCode && courseWithSameCode.id !== course.id) {
			return getGenericErrorParent()
		}
	}

	const updatedCourse = await repositories.course.update(course.id, {
		updated_by_id: user.sub,
		name: validatedData.name,
		code: validatedData.code,
		eva: validatedData.eva,
		visibility: validatedData.visibility && getDbCommonVisibilityValue(validatedData.visibility),
	})

	return getUpdateCoursePayload({
		course: updatedCourse,
	})
}
