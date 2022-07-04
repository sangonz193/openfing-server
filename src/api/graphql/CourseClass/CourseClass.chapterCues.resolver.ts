import { zapatosDb } from "../../../database"
import { getCourseClassChapterCueParent } from "../CourseClassChapterCue/CourseClassChapterCue.parent"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClass"]["chapterCues"] = async (parent, _, context) => {
	return (
		await context.repositories.courseClassChapterCue.findAll({
			courseClassId: parent.id,
		})
	).map((courseClassChapterCue) =>
		getCourseClassChapterCueParent({
			...courseClassChapterCue,
			created_at: zapatosDb.toString(courseClassChapterCue.created_at, "timestamptz"),
			updated_at: zapatosDb.toString(courseClassChapterCue.updated_at, "timestamptz"),
			deleted_at: zapatosDb.toString(courseClassChapterCue.deleted_at, "timestamptz"),
		})
	)
}

export default resolver
