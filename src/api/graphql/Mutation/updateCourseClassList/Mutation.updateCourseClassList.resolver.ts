import * as yup from "yup"

import { getCourseClassListFromRef } from "../../_utils/getCourseClassListFromRef"
import { getDbCommonVisibilityValue } from "../../_utils/getDbCommonVisibilityValue"
import { validateSecret } from "../../_utils/validateSecret"
import { getAuthenticationErrorParent } from "../../AuthenticationError/AuthenticationError.parent"
import { getNotFoundErrorParent } from "../../NotFoundError/NotFoundError.parent"
import { MutationUpdateCourseClassListArgs, Resolvers } from "../../schemas.types"
import { getUpdateCourseClassListPayload } from "./UpdateCourseClassListPayload.parent"

const resolver: Resolvers["Mutation"]["updateCourseClassList"] = async (_, args, context) => {
	const { repositories } = context

	if (!validateSecret(args.secret)) {
		return getAuthenticationErrorParent()
	}

	const courseClassList = await getCourseClassListFromRef(
		args.ref,
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
			yup.SchemaOf<
				{
					[K in keyof MutationUpdateCourseClassListArgs["input"]]: Exclude<
						MutationUpdateCourseClassListArgs["input"][K],
						null
					>
				}
			>["fields"]
		>({
			name: yup.string().trim().max(200).notRequired(),
			visibility: yup.mixed().nullable(),
		})
		.required()
		.validate(args)

	return getUpdateCourseClassListPayload({
		courseClassList: await repositories.courseClassList.update(courseClassList.id, {
			name: validatedData.name,
			visibility: validatedData.visibility && getDbCommonVisibilityValue(validatedData.visibility),
			
		}),
	})
}

export default resolver
