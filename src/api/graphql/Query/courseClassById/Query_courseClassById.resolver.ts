import { getCourseClassParent } from "../../CourseClass/CourseClass.parent"
import { getNotFoundErrorParent } from "../../NotFoundError/NotFoundError.parent"
import { Resolvers } from "../../schemas.types"

const resolver: Resolvers["Query"]["courseClassById"] = async (_, args, { dataLoaders }) => {
	const courseClass = await dataLoaders.courseClass.load({ id: args.id, includeHidden: true })

	return courseClass ? getCourseClassParent(courseClass) : getNotFoundErrorParent()
}

export default resolver
