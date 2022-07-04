import { RequestContext } from "../../context/RequestContext"
import { zapatosDb } from "../zapatos/zapatos.db"

export type DeleteCourseClassChapterCuesByCourseClassIdOptions = {
	courseClassId: string
}

export async function deleteCourseClassChapterCuesByCourseClassId(
	options: DeleteCourseClassChapterCuesByCourseClassIdOptions,
	context: Pick<RequestContext, "pool">
): Promise<true> {
	const response = await zapatosDb
		.deletes("course_class_chapter_cue", {
			course_class_id: options.courseClassId,
		})
		.run(context.pool)
	console.log(response)

	return true
}
