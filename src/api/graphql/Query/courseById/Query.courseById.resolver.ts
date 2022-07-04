import { getCourseParent } from "../../Course/Course.parent"
import { getNotFoundErrorParent } from "../../NotFoundError/NotFoundError.parent"
import { Resolvers } from "../../schemas.types"

const resolver: Resolvers["Query"]["courseById"] = async (_, args, context) => {
	const { id } = args
	const { dataLoaders } = context

	const course = await dataLoaders.course.load({ id, includeHidden: true })
	if (course) {
		return getCourseParent(course)
	}

	return getNotFoundErrorParent()
}

export default resolver
