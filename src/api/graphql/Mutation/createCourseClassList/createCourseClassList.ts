import * as yup from "yup"

import { RequestContext } from "../../../../context/RequestContext"
import { getDbCommonVisibilityValue } from "../../_utils/getDbCommonVisibilityValue"
import { getGenericErrorParent } from "../../GenericError/GenericError.parent"
import { CreateCourseClassListInput, MutationCreateCourseClassListArgs } from "../../schemas.types"
import { getCreateCourseClassListPayloadParent } from "./CreateCourseClassListPayload.parent"

export async function createCourseClassList(
	input: CreateCourseClassListInput,
	context: RequestContext & Required<Pick<RequestContext, "user">>
) {
	const { user, dataLoaders, repositories } = context

	const validatedDataPromise = yup
		.object<yup.SchemaOf<MutationCreateCourseClassListArgs["input"]>["fields"]>({
			courseCode: yup.string().trim().required(),
			code: yup.string().trim().max(20).required(),
			semester: yup.number().moreThan(0).lessThan(3).required(),
			year: yup.number().moreThan(2005).lessThan(2030).required(),
			name: yup.string().trim().max(200).required(),
			visibility: yup.mixed().nullable(),
		})
		.required()
		.validate(input)

	let validatedData: typeof validatedDataPromise extends Promise<infer T> ? T : unknown
	try {
		validatedData = await validatedDataPromise
	} catch (e: unknown) {
		console.log(e)
		return getGenericErrorParent()
	}

	const course = await context.dataLoaders.course.load({
		code: validatedData.courseCode,
		includeDisabled: true,
		includeHidden: true,
	})

	if (!course) {
		console.log("no course found")
		return getGenericErrorParent()
	}

	const courseEditions = await repositories.courseEdition.findAll({
		courseId: course.id,
		includeDisabled: true,
		includeHidden: true,
	})

	let courseEdition = courseEditions.find(
		(courseEdition) =>
			courseEdition.semester === validatedData.semester && courseEdition.year === validatedData.year
	)

	if (!courseEdition) {
		courseEdition = await repositories.courseEdition.save(
			repositories.courseEdition.create({
				course_id: course.id,
				created_by_id: user.sub,
				name: `Edición ${validatedData.year}, ${
					validatedData.semester === 1 ? "primer semestre" : "segundo semestre"
				}`,
				year: validatedData.year,
				semester: validatedData.semester,
				visibility: getDbCommonVisibilityValue(validatedData.visibility || "PUBLIC"),
			})
		)
		// TODO: necessary?
		dataLoaders.courseEdition.clearAll()
	}

	let courseClassListWithSameCode = await dataLoaders.courseClassList.load({
		code: validatedData.code,
		includeDisabled: true,
		includeHidden: true,
	})

	if (!courseClassListWithSameCode) {
		courseClassListWithSameCode = await repositories.courseClassList.createAndInsert({
			code: validatedData.code,
			created_by_id: user.sub,
			course_edition_id: courseEdition.id,
			name: validatedData.name,
			visibility: getDbCommonVisibilityValue(validatedData.visibility || "PUBLIC"),
		})
		// TODO: necessary?
		dataLoaders.courseClassList.clearAll()

		return getCreateCourseClassListPayloadParent({
			courseClassList: courseClassListWithSameCode,
		})
	}

	console.log("courseClassList with same code found")
	return getGenericErrorParent()
}
