import { getCourseClassParent } from "../../CourseClass/CourseClass.parent"
import { Resolvers } from "../../schemas.types"

const resolver: Resolvers["Query"]["latestCourseClasses"] = async (_, __, context) => {
	return (await context.repositories.courseClass.findAll({ latest: 20 })).map(getCourseClassParent)
}

export default resolver
