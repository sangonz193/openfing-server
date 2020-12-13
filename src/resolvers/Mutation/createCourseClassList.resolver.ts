import * as yup from "yup";

import { getAuthenticationError } from "../_utils/getAuthenticationError";
import { getGenericError } from "../_utils/getGenericError";
import { getUserFromSecret } from "../_utils/getUserFromSecret";
import { backupDb } from "../../_helpers/backupDb";
import { getDbCommonVisibilityValue } from "../../_helpers/getDbCommonVisibilityValue";
import { MutationCreateCourseClassListArgs, Resolvers } from "../../generated/graphql.types";
import { getCreateCourseClassListPayloadParent } from "../CreateCourseClassListPayload/CreateCourseClassListPayload.parent";

const resolver: Resolvers["Mutation"]["createCourseClassList"] = async (_, args, context) => {
	const user = await getUserFromSecret(args.secret, context);

	if (!user) return getAuthenticationError();

	const { dataLoaders, repositories } = context;

	const validatedDataPromise = yup
		.object<MutationCreateCourseClassListArgs["input"]>({
			courseCode: yup.string().trim().required(),
			code: yup.string().trim().max(20).required(),
			semester: yup.number().moreThan(0).lessThan(3).required(),
			year: yup.number().moreThan(2005).lessThan(2030).required(),
			name: yup.string().trim().max(200).required(),
		})
		.required()
		.validate(args.input);

	let validatedData: typeof validatedDataPromise extends Promise<infer T> ? T : unknown;
	try {
		validatedData = await validatedDataPromise;
	} catch (e) {
		console.log(e);
		return getGenericError();
	}

	const course = await context.dataLoaders.course.load({
		code: validatedData.courseCode,
		includeDisabled: true,
		includeHidden: true,
	});

	if (!course) {
		console.log("no course found");
		return getGenericError();
	}

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
				course_id: course.id,
				created_by_id: user.id,
				name: `Edición ${validatedData.year}, ${
					validatedData.semester === 1 ? "primer semestre" : "segundo semestre"
				}`,
				year: validatedData.year,
				semester: validatedData.semester,
				visibility: getDbCommonVisibilityValue(validatedData.visibility || "PUBLIC"),
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
		courseClassListWithSameCode = await repositories.courseClassList.createAndInsert({
			code: validatedData.code,
			created_by_id: user.id,
			course_edition_id: courseEdition.id,
			name: validatedData.name,
			visibility: getDbCommonVisibilityValue(validatedData.visibility || "PUBLIC"),
		});
		// TODO: necessary?
		dataLoaders.courseClassList.clearAll();

		await backupDb(context.ormConnection);

		return getCreateCourseClassListPayloadParent({
			courseClassList: courseClassListWithSameCode,
		});
	}

	console.log("courseClassList with same code found");
	return getGenericError();
};

export default resolver;
