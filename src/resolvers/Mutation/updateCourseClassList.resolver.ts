import * as yup from "yup";

import { getDbCommonVisibilityValue } from "../../_helpers/getDbCommonVisibilityValue";
import { MutationUpdateCourseClassListArgs, Resolvers } from "../../generated/graphql.types";
import { getAuthenticationError } from "../_utils/getAuthenticationError";
import { getCourseClassListFromRef } from "../_utils/getCourseClassListFromRef";
import { getNotFoundError } from "../_utils/getNotFoundError";
import { getUserFromSecret } from "../_utils/getUserFromSecret";
import { getUpdateCourseClassListPayload } from "../UpdateCourseClassListPayload/UpdateCourseClassListPayload.parent";

const resolver: Resolvers["Mutation"]["updateCourseClassList"] = async (_, args, context) => {
	const { repositories } = context;

	const user = await getUserFromSecret(args.secret, context);
	if (!user) return getAuthenticationError();

	const courseClassList = await getCourseClassListFromRef(
		args.ref,
		{
			includeHidden: true,
			includeDisabled: true,
		},
		context
	);
	if (!courseClassList) return getNotFoundError();

	const validatedData = await yup
		.object<
			yup.SchemaOf<
				{
					[K in keyof MutationUpdateCourseClassListArgs["input"]]: Exclude<
						MutationUpdateCourseClassListArgs["input"][K],
						null
					>;
				}
			>["fields"]
		>({
			name: yup.string().trim().max(200).notRequired(),
			visibility: yup.mixed().nullable(),
		})
		.required()
		.validate(args);

	return getUpdateCourseClassListPayload({
		courseClassList: await repositories.courseClassList.update(courseClassList.id, {
			name: validatedData.name,
			visibility: validatedData.visibility && getDbCommonVisibilityValue(validatedData.visibility),
		}),
	});
};

export default resolver;
