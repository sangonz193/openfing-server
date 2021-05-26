import { getCourseClassParent } from "../CourseClass/CourseClass.parent"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClassChapterCue"]["courseClass"] = async (parent, _, { dataLoaders }) => {
	const courseClass = parent.course_class_id && (await dataLoaders.courseClass.load({ id: parent.course_class_id }))

	if (courseClass) {
		return getCourseClassParent(courseClass)
	}

	return null
}

export default resolver
