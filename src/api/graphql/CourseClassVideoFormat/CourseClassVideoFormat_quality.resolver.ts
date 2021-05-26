import { getCourseClassVideoQualityParent } from "../CourseClassVideoQuality/CourseClassVideoQuality.parent"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClassVideoFormat"]["quality"] = async (parent, {}, { dataLoaders }) => {
	const quality =
		parent.course_class_video_quality_id !== null &&
		(await dataLoaders.courseClassVideoQuality.load({ id: parent.course_class_video_quality_id }))

	return quality ? getCourseClassVideoQualityParent(quality) : null
}

export default resolver
