import DataLoader from "dataloader"
import { Pool } from "pg"

import { zapatosSchema } from "../zapatos/zapatos.schema"
import {
	insertCourseClassChapterCueBatch,
	InsertCourseClassChapterCueBatchOptions,
} from "./insertCourseClassChapterCueBatch"

export type CourseClassChapterCueDataLoader = ReturnType<typeof getCourseClassChapterCueDataLoader>

export function getCourseClassChapterCueDataLoader(pool: Pool) {
	return {
		insert: new DataLoader<
			InsertCourseClassChapterCueBatchOptions["data"][number],
			zapatosSchema.course_class_chapter_cue.JSONSelectable | null
		>(
			async (options) => {
				return await insertCourseClassChapterCueBatch({ data: [...options] }, { pool })
			},
			{
				cache: false,
			}
		),
	}
}
