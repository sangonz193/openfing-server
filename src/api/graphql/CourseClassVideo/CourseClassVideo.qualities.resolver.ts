import { getCourseClassVideoQualityParent } from "../CourseClassVideoQuality/CourseClassVideoQuality.parent"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClassVideo"]["qualities"] = async (parent, _, { repositories }) => {
	return (await repositories.courseClassVideoQuality.findAll({ courseClassVideoId: parent.id })).map((quality) =>
		getCourseClassVideoQualityParent(quality)
	)
}

export default resolver
