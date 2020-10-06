import Axios from "axios";
import * as yup from "yup";

import { getAuthenticationError } from "../_utils/getAuthenticationError";
import { getGenericError } from "../_utils/getGenericError";
import { getUserFromSecret } from "../_utils/getUserFromSecret";
import { identity } from "../../_utils/identity";
import { isAxiosError } from "../../_utils/isAxiosError";
import { CourseVisibility } from "../../entities/Course";
import { CreateCourseInputVisibility, MutationCreateCourseArgs, Resolvers } from "../../generated/graphql.types";
import { getCreateCoursePayloadParent } from "../CreateCoursePayload/CreateCoursePayload.parent";

const resolver: Resolvers["Mutation"]["createCourse"] = async (_, args, context) => {
	const user = await getUserFromSecret(args.secret, context);

	if (!user) return getAuthenticationError();

	const { dataLoaders } = context;

	const validatedData = await yup
		.object<MutationCreateCourseArgs["input"]>({
			code: yup.string().trim().max(20).required(),
			eva: yup.string().trim().max(300),
			name: yup.string().trim().max(200).required(),
		})
		.required()
		.validate(args.input);

	let iconUrl: string | null = `https://open.fing.edu.uy/Images/iconCourse/${validatedData.code}_image.svg`;

	const response = await Axios.get(iconUrl).catch((e) => e);
	if (isAxiosError(response) || typeof response.data !== "string" || response.data.includes('<div id="root"></div>'))
		iconUrl = null;

	let courseWithSameCode = await dataLoaders.course.findOne({
		code: validatedData.code,
		includeDisabled: true,
		includeHidden: true,
	});

	if (!courseWithSameCode) {
		courseWithSameCode = await dataLoaders.course.save(
			dataLoaders.course.create({
				code: validatedData.code,
				createdById: user.id,
				eva: validatedData.eva || null,
				iconUrl,
				name: validatedData.name,
				visibility: identity<Record<Extract<CreateCourseInputVisibility, string>, string>>({
					DISABLED: CourseVisibility.disabled,
					HIDDEN: CourseVisibility.hidden,
					PUBLIC: CourseVisibility.public,
				})[validatedData.visibility || "PUBLIC"],
			})
		);

		return getCreateCoursePayloadParent({
			course: courseWithSameCode,
		});
	}

	return getGenericError();
};

export default resolver;
