import { SafeOmit } from "@sangonz193/utils/SafeOmit"
import * as yup from "yup"

import { RequestContext } from "../../../../context/RequestContext"
import { getCourseClassListFromRef } from "../../_utils/getCourseClassListFromRef"
import { getDbCommonVisibilityValue } from "../../_utils/getDbCommonVisibilityValue"
import { syncCourseClassVideosForClass } from "../../_utils/syncCourseClassVideosForClass"
import { getGenericErrorParent } from "../../GenericError/GenericError.parent"
import { CreateCourseClassInput, MutationCreateCourseClassArgs } from "../../schemas.types"
import { getCreateCourseClassPayloadParent } from "./CreateCourseClassPayload.parent"

export async function createCourseClass(
	input: CreateCourseClassInput,
	context: RequestContext & Required<Pick<RequestContext, "user">>
) {
	const { dataLoaders, repositories, user } = context

	const validatedInput = await getValidatedInput(input)
	if (!validatedInput) {
		return getGenericErrorParent()
	}

	const courseClassList = await getCourseClassListFromRef(
		input.courseClassListRef,
		{
			includeDisabled: true,
			includeHidden: true,
		},
		context
	)

	if (!courseClassList) {
		console.log("course class list not found")
		return getGenericErrorParent()
	}

	const courseClasses = await repositories.courseClass.findAll({
		courseClassListId: courseClassList.id,
		includeDisabled: true,
		includeHidden: true,
	})

	const courseClassWithSameNumber = courseClasses.find((courseClass) => courseClass.number === validatedInput.number)

	if (courseClassWithSameNumber) {
		console.log("course class with same number found")
		return getGenericErrorParent()
	}

	const courseClass = await repositories.courseClass.createAndInsert({
		created_by_id: user.sub,
		course_class_list_id: courseClassList.id,
		name: validatedInput.name,
		published_at: new Date(),
		visibility: getDbCommonVisibilityValue(validatedInput.visibility || "PUBLIC"),
		number: validatedInput.number,
	})
	// TODO: necessary?
	dataLoaders.courseClass.clearAll()

	await syncCourseClassVideosForClass({
		courseClassList: courseClassList,
		number: validatedInput.number,
		userId: user.sub,
		context: context,
	})

	return getCreateCourseClassPayloadParent({
		courseClass,
	})
}

async function getValidatedInput(
	input: CreateCourseClassInput
): Promise<SafeOmit<MutationCreateCourseClassArgs["input"], "courseClassListRef"> | null> {
	const validatedData = await yup
		.object<yup.SchemaOf<SafeOmit<MutationCreateCourseClassArgs["input"], "courseClassListRef">>["fields"]>({
			name: yup.string().trim().max(200).required(),
			number: yup.number().moreThan(0).lessThan(1000).required(),
			visibility: yup.mixed().nullable(),
		})
		.required()
		.validate(input)
		.catch((e) => {
			console.log(e)
			return null
		})

	return validatedData
}
