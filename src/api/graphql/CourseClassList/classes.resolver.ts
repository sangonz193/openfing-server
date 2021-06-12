import { getCourseClassParent } from "../CourseClass/CourseClass.parent"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClassList"]["classes"] = async (parent, _, { repositories, includeHidden }) => {
	return (
		await repositories.courseClass.findAll({
			courseClassListId: parent.id,
			includeHidden,
		})
	).map((courseClass) => getCourseClassParent(courseClass))
}

export default resolver
