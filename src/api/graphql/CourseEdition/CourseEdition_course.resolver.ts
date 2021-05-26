import { getCourseParent } from "../Course/Course.parent"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseEdition"]["course"] = async (parent, _, { dataLoaders, includeHidden }) => {
	const course = parent.course_id !== null && (await dataLoaders.course.load({ id: parent.course_id, includeHidden }))

	return course ? getCourseParent(course) : null
}

export default resolver
