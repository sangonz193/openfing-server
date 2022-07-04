import { getUuid } from "@sangonz193/utils/getUuid"
import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { RequestContext } from "../../context/RequestContext"
import { zapatosDb } from "../zapatos/zapatos.db"
import { zapatosSchema } from "../zapatos/zapatos.schema"

export type InsertCourseClassChapterCueBatchOptions = {
	data: Array<
		SafeOmit<
			Required<zapatosSchema.course_class_chapter_cue.Insertable>,
			"id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id"
		> &
			Partial<
				Pick<
					zapatosSchema.course_class_chapter_cue.Insertable,
					"id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id"
				>
			>
	>
}

export async function insertCourseClassChapterCueBatch(
	options: InsertCourseClassChapterCueBatchOptions,
	context: Pick<RequestContext, "pool">
): Promise<Array<zapatosSchema.course_class_chapter_cue.JSONSelectable | null>> {
	const { pool } = context
	const rowsToInsert = options.data.map<Required<zapatosSchema.course_class_chapter_cue.Insertable>>((item) => ({
		...item,
		id: item.id ?? getUuid(),
		created_at: item.created_at ?? new Date(),
		updated_at: null,
		deleted_at: null,
		updated_by_id: item.updated_by_id ?? null,
		deleted_by_id: item.updated_by_id ?? null,
	}))

	const insertResult = await zapatosDb.insert("course_class_chapter_cue", rowsToInsert).run(context.pool)

	const queryResult = await zapatosDb
		.select("course_class_chapter_cue", {
			id: zapatosDb.conditions.isIn(rowsToInsert.map((row) => row.id)),
		})
		.run(pool)
	const chapterCueMap = new Map(queryResult.map((row) => [row.id, row]))

	const result: Array<zapatosSchema.course_class_chapter_cue.JSONSelectable | null> = insertResult.map((item) => {
		return chapterCueMap.get(item.id) ?? null
	})

	return result
}
