import { identity } from "lodash";
import * as yup from "yup";

import { getAuthenticationError } from "../_utils/getAuthenticationError";
import { getCourseClassListFromRef } from "../_utils/getCourseClassListFromRef";
import { getNotFoundError } from "../_utils/getNotFoundError";
import { getUserFromSecret } from "../_utils/getUserFromSecret";
import { getDbCommonVisibilityValue } from "../../_helpers/getDbCommonVisibilityValue";
import { dangerousKeysOf } from "../../_utils/dangerousKeysOf";
import {
	MutationUpdateCourseClassListArgs,
	Resolvers,
	UpdateCourseClassListInputVisibility,
} from "../../generated/graphql.types";
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
			{
				[K in keyof MutationUpdateCourseClassListArgs["input"]]: Exclude<
					MutationUpdateCourseClassListArgs["input"][K],
					null
				>;
			}
		>({
			name: yup.string().trim().max(200).notRequired(),
			visibility: yup.string().oneOf(
				dangerousKeysOf(
					identity<{ [T in UpdateCourseClassListInputVisibility]: "" }>({
						DISABLED: "",
						HIDDEN: "",
						PUBLIC: "",
					})
				)
			),
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
