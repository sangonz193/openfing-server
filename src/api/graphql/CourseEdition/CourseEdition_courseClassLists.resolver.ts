import { getCourseClassListParent } from "../CourseClassList/CourseClassList.parent"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseEdition"]["courseClassLists"] = async (parent, _, { repositories, includeHidden }) => {
	return (
		await repositories.courseClassList.findAll({
			courseEditionId: parent.id,
			includeHidden,
		})
	).map((courseClassList) => getCourseClassListParent(courseClassList))
}

export default resolver
