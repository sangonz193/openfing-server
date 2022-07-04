import { getCourseEditionParent } from "../CourseEdition/CourseEdition.parent"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["Course"]["editions"] = async (parent, _, context) => {
	const { repositories, includeHidden } = context

	return (
		await repositories.courseEdition.findAll({
			courseId: parent.id,
			includeHidden,
		})
	).map(getCourseEditionParent)
}

export default resolver
