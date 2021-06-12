import { SafeOmit } from "@sangonz193/utils/SafeOmit"
import * as yup from "yup"

import { RequestContext } from "../../../../context/RequestContext"
import { backup } from "../../../../modules/backup/backup"
import { getCourseClassListFromRef } from "../../_utils/getCourseClassListFromRef"
import { getDbCommonVisibilityValue } from "../../_utils/getDbCommonVisibilityValue"
import { syncCourseClassVideosForClass } from "../../_utils/syncCourseClassVideosForClass"
import { getGenericErrorParent } from "../../GenericError/GenericError.parent"
import { withUserFromSecret } from "../../middlewares/withUserFromSecret"
import {
	MutationCreateCourseClassArgs,
	RequireFields,
	ResolverFn,
	ResolversParentTypes,
	ResolversTypes,
} from "../../schemas.types"
import { getCreateCourseClassPayloadParent } from "./CreateCourseClassPayload.parent"

const resolver: ResolverFn<
	ResolversTypes["CreateCourseClassResult"],
	ResolversParentTypes["Mutation"],
	RequestContext & Required<Pick<RequestContext, "user">>,
	RequireFields<MutationCreateCourseClassArgs, "input" | "secret">
> = async (_, args, context) => {
	const { dataLoaders, repositories, user } = context

	const validatedArgs = await getValidatedArgs(args)
	if (!validatedArgs) {
		return getGenericErrorParent()
	}

	const courseClassList = await getCourseClassListFromRef(
		args.input.courseClassListRef,
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

	const courseClassWithSameNumber = courseClasses.find((courseClass) => courseClass.number === validatedArgs.number)

	if (courseClassWithSameNumber) {
		console.log("course class with same number found")
		return getGenericErrorParent()
	}

	const courseClass = await repositories.courseClass.createAndInsert({
		created_by_id: user.id,
		course_class_list_id: courseClassList.id,
		name: validatedArgs.name,
		published_at: new Date(),
		visibility: getDbCommonVisibilityValue(validatedArgs.visibility || "PUBLIC"),
		number: validatedArgs.number,
	})
	// TODO: necessary?
	dataLoaders.courseClass.clearAll()

	await syncCourseClassVideosForClass({
		courseClassList: courseClassList,
		number: validatedArgs.number,
		userId: user.id,
		context: context,
	})
	await backup()

	return getCreateCourseClassPayloadParent({
		courseClass,
	})
}

async function getValidatedArgs(
	args: Parameters<Extract<typeof resolver, (...args: any[]) => void>>[1]
): Promise<SafeOmit<MutationCreateCourseClassArgs["input"], "courseClassListRef"> | null> {
	const validatedData = await yup
		.object<yup.SchemaOf<SafeOmit<MutationCreateCourseClassArgs["input"], "courseClassListRef">>["fields"]>({
			name: yup.string().trim().max(200).required(),
			number: yup.number().moreThan(0).lessThan(1000).required(),
			visibility: yup.mixed().nullable(),
		})
		.required()
		.validate(args.input)
		.catch((e) => {
			console.log(e)
			return null
		})

	return validatedData
}

export default withUserFromSecret(resolver)
