import Axios from "axios";
import * as yup from "yup";

import { isAxiosError } from "../../../../_utils/isAxiosError";
import { getDbCommonVisibilityValue } from "../../_utils/getDbCommonVisibilityValue";
import { getUserFromSecret } from "../../_utils/getUserFromSecret";
import { getAuthenticationErrorParent } from "../../AuthenticationError/AuthenticationError.parent";
import { getGenericErrorParent } from "../../GenericError/GenericError.parent";
import { MutationCreateCourseArgs, Resolvers } from "../../schemas.types";
import { getCreateCoursePayloadParent } from "./CreateCoursePayload.parent";

const resolver: Resolvers["Mutation"]["createCourse"] = async (_, args, context) => {
	const user = await getUserFromSecret(args.secret, context);

	if (!user) {
		return getAuthenticationErrorParent();
	}

	const { dataLoaders, repositories } = context;

	const validatedData = await yup
		.object<yup.SchemaOf<MutationCreateCourseArgs["input"]>["fields"]>({
			code: yup.string().trim().max(20).required(),
			eva: yup.string().trim().max(300),
			name: yup.string().trim().max(200).required(),
			visibility: yup.mixed().nullable(),
		})
		.required()
		.validate(args.input);

	let iconUrl: string | null = `https://open.fing.edu.uy/Images/iconCourse/${validatedData.code}_image.svg`;

	const response = await Axios.get(iconUrl).catch((e) => e);
	if (
		isAxiosError(response) ||
		typeof response.data !== "string" ||
		response.data.includes('<div id="root"></div>')
	) {
		iconUrl = null;
	}

	let courseWithSameCode = await dataLoaders.course.load({
		code: validatedData.code,
		includeDisabled: true,
		includeHidden: true,
	});

	if (!courseWithSameCode) {
		courseWithSameCode = await repositories.course.createAndInsert({
			code: validatedData.code,
			created_by_id: user.id,
			eva: validatedData.eva || null,
			icon_url: iconUrl,
			name: validatedData.name,
			visibility: getDbCommonVisibilityValue(validatedData.visibility || "PUBLIC"),
		});
		// TODO: necessary?
		dataLoaders.course.clearAll();

		return getCreateCoursePayloadParent({
			course: courseWithSameCode,
		});
	}

	return getGenericErrorParent();
};

export default resolver;
