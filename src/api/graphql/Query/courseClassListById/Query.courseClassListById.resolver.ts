import { getCourseClassListParent } from "../../CourseClassList/CourseClassList.parent"
import { getNotFoundErrorParent } from "../../NotFoundError/NotFoundError.parent"
import { Resolvers } from "../../schemas.types"

const resolver: Resolvers["Query"]["courseClassListById"] = async (_, args, context) => {
	const { id } = args
	const { dataLoaders } = context

	const courseClassList = await dataLoaders.courseClassList.load({
		id,
		includeHidden: true,
	})

	if (courseClassList) {
		context.includeHidden = courseClassList.visibility === "hidden"
		return getCourseClassListParent(courseClassList)
	}

	return getNotFoundErrorParent()
}

export default resolver
