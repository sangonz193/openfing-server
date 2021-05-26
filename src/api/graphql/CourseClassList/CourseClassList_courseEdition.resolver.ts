import { getCourseEditionParent } from "../CourseEdition/CourseEdition.parent"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClassList"]["courseEdition"] = async (parent, _, { dataLoaders, includeHidden }) => {
	if (parent.course_edition_id === null) {
		return null
	}

	const courseEdition = await dataLoaders.courseEdition.load({
		id: parent.course_edition_id,
		includeHidden,
	})

	return courseEdition && getCourseEditionParent(courseEdition)
}

export default resolver
