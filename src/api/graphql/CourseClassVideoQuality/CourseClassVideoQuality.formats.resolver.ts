import { getCourseClassVideoFormatParent } from "../CourseClassVideoFormat/CourseClassVideoFormat.parent"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClassVideoQuality"]["formats"] = async (parent, _, { repositories }) => {
	return (await repositories.courseClassVideoFormat.findAll({ courseClassVideoQualityId: parent.id })).map(
		(courseClassVideoFormat) => getCourseClassVideoFormatParent(courseClassVideoFormat)
	)
}

export default resolver
