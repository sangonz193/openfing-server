import * as yup from "yup";

import { getAuthenticationError } from "../_utils/getAuthenticationError";
import { getGenericError } from "../_utils/getGenericError";
import { getUserFromSecret } from "../_utils/getUserFromSecret";
import { backupDb } from "../../_helpers/backupDb";
import { identity } from "../../_utils/identity";
import { CourseVisibility } from "../../entities/Course";
import { CourseEditionVisibility } from "../../entities/CourseEdition";
import {
	CreateCourseClassListInputVisibility,
	CreateCourseInputVisibility,
	MutationCreateCourseClassListArgs,
	Resolvers,
} from "../../generated/graphql.types";
import { getCreateCourseClassListPayloadParent } from "../CreateCourseClassListPayload/CreateCourseClassListPayload.parent";

const resolver: Resolvers["Mutation"]["createCourseClassList"] = async (_, args, context) => {
	const user = await getUserFromSecret(args.secret, context);

	if (!user) return getAuthenticationError();

	const { dataLoaders, repositories } = context;

	const validatedData = await yup
		.object<MutationCreateCourseClassListArgs["input"]>({
			courseCode: yup.string().trim().required(),
			code: yup.string().trim().max(20).required(),
			semester: yup.number().moreThan(0).lessThan(3).required(),
			year: yup.number().moreThan(2005).lessThan(2030).required(),
			name: yup.string().trim().max(200).required(),
		})
		.required()
		.validate(args.input);

	const course = await context.dataLoaders.course.load({
		code: validatedData.courseCode,
		includeDisabled: true,
		includeHidden: true,
	});

	if (!course) return getGenericError();

	const courseEditions = await repositories.courseEdition.findAll({
		courseId: course.id,
		includeDisabled: true,
		includeHidden: true,
	});

	let courseEdition = courseEditions.find(
		(courseEdition) =>
			courseEdition.semester === validatedData.semester && courseEdition.year === validatedData.year
	);

	if (!courseEdition) {
		courseEdition = await repositories.courseEdition.save(
			repositories.courseEdition.create({
				courseId: course.id,
				createdById: user.id,
				name: `Edición ${validatedData.year}, ${
					validatedData.semester === 1 ? "primer semestre" : "segundo semestre"
				}`,
				year: validatedData.year,
				semester: validatedData.semester,
				// TODO: type visibility!
				visibility: identity<Record<Extract<CreateCourseClassListInputVisibility, string>, string>>({
					DISABLED: CourseEditionVisibility.disabled,
					HIDDEN: CourseEditionVisibility.hidden,
					PUBLIC: CourseEditionVisibility.public,
				})[validatedData.visibility || "PUBLIC"],
			})
		);
		// TODO: necessary?
		dataLoaders.courseEdition.clearAll();
	}

	let courseClassListWithSameCode = await dataLoaders.courseClassList.load({
		code: validatedData.code,
		includeDisabled: true,
		includeHidden: true,
	});

	if (!courseClassListWithSameCode) {
		courseClassListWithSameCode = await repositories.courseClassList.save(
			repositories.courseClassList.create({
				code: validatedData.code,
				createdById: user.id,
				courseEditionId: courseEdition.id,
				name: validatedData.name,
				visibility: identity<Record<Extract<CreateCourseInputVisibility, string>, string>>({
					DISABLED: CourseVisibility.disabled,
					HIDDEN: CourseVisibility.hidden,
					PUBLIC: CourseVisibility.public,
				})[validatedData.visibility || "PUBLIC"],
			})
		);
		// TODO: necessary?
		dataLoaders.courseClassList.clearAll();

		await backupDb(context.ormConnection);

		return getCreateCourseClassListPayloadParent({
			courseClassList: courseClassListWithSameCode,
		});
	}

	return getGenericError();
};

export default resolver;
