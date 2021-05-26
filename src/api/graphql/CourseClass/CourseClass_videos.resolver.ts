import { getCourseClassVideoParent } from "../CourseClassVideo/CourseClassVideo.parent"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClass"]["videos"] = async (parent, _, context) => {
	return (
		await context.repositories.courseClassVideo.findAll({
			courseClassId: parent.id,
		})
	).map((courseClassVideo) => getCourseClassVideoParent(courseClassVideo))
}

export default resolver
