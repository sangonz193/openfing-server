import * as yup from "yup"

import { RequestContext } from "../../../../context/RequestContext"
import { getCourseClassListFromRef } from "../../_utils/getCourseClassListFromRef"
import { getDbCommonVisibilityValue } from "../../_utils/getDbCommonVisibilityValue"
import { getNotFoundErrorParent } from "../../NotFoundError/NotFoundError.parent"
import { CourseClassListRef, MutationUpdateCourseClassListArgs, UpdateCourseClassListInput } from "../../schemas.types"
import { getUpdateCourseClassListPayload } from "./UpdateCourseClassListPayload.parent"

export async function updateCourseClassList(
	courseClassListRef: CourseClassListRef,
	input: UpdateCourseClassListInput,
	context: RequestContext & Required<Pick<RequestContext, "user">>
) {
	const { repositories } = context

	const courseClassList = await getCourseClassListFromRef(
		courseClassListRef,
		{
			includeHidden: true,
			includeDisabled: true,
		},
		context
	)
	if (!courseClassList) {
		return getNotFoundErrorParent()
	}

	const validatedData = await yup
		.object<
			yup.SchemaOf<{
				[K in keyof MutationUpdateCourseClassListArgs["input"]]: Exclude<
					MutationUpdateCourseClassListArgs["input"][K],
					null
				>
			}>["fields"]
		>({
			name: yup.string().trim().max(200).notRequired(),
			visibility: yup.mixed().nullable(),
		})
		.required()
		.validate(input)

	return getUpdateCourseClassListPayload({
		courseClassList: await repositories.courseClassList.update(courseClassList.id, {
			name: validatedData.name,
			visibility: validatedData.visibility && getDbCommonVisibilityValue(validatedData.visibility),
		}),
	})
}
