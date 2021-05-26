import { getCourseClassVideoParent } from "../CourseClassVideo/CourseClassVideo.parent"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClassVideoQuality"]["video"] = async (parent, {}, { dataLoaders, includeHidden }) => {
	const video =
		parent.course_class_video_id !== null &&
		(await dataLoaders.courseClassVideo.load({ id: parent.course_class_video_id, includeHidden }))

	return video ? getCourseClassVideoParent(video) : null
}

export default resolver
