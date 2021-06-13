import { getCourseClassParent } from "../CourseClass/CourseClass.parent"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClassLiveState"]["courseClass"] = async (parent, _, context) => {
	const courseClass = await context.dataLoaders.courseClass.load({ id: parent.course_class_id, includeHidden: true })
	return courseClass && getCourseClassParent(courseClass)
}

export default resolver
