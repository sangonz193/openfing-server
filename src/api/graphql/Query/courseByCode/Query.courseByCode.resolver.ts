import { getCourseParent } from "../../Course/Course.parent"
import { getNotFoundErrorParent } from "../../NotFoundError/NotFoundError.parent"
import { Resolvers } from "../../schemas.types"

const resolver: Resolvers["Query"]["courseByCode"] = async (_, args, context) => {
	const { dataLoaders } = context
	const course = await dataLoaders.course.load({ code: args.code, includeHidden: true })

	return course ? getCourseParent(course) : getNotFoundErrorParent()
}

export default resolver
