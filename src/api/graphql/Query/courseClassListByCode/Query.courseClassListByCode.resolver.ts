import { getUserFromContext } from "../../../_utils/getUserFromContext"
import { getCourseClassListParent } from "../../CourseClassList/CourseClassList.parent"
import { getNotFoundErrorParent } from "../../NotFoundError/NotFoundError.parent"
import { Resolvers } from "../../schemas.types"

const resolver: Resolvers["Query"]["courseClassListByCode"] = async (_, args, context) => {
	const { dataLoaders } = context
	const courseClassList = await dataLoaders.courseClassList.load({
		code: args.code,
		includeHidden: true,
	})
	const user = await getUserFromContext(context)

	if (courseClassList) {
		context.includeHidden = courseClassList.visibility === "hidden" || !!user
		return getCourseClassListParent(courseClassList)
	}

	return getNotFoundErrorParent()
}

export default resolver
