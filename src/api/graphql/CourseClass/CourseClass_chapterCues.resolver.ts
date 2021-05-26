import { getCourseClassChapterCueParent } from "../CourseClassChapterCue/CourseClassChapterCue.parent"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClass"]["chapterCues"] = async (parent, _, context) => {
	return (
		await context.repositories.courseClassChapterCue.findAll({
			courseClassId: parent.id,
		})
	).map((courseClassChapterCue) => getCourseClassChapterCueParent(courseClassChapterCue))
}

export default resolver
