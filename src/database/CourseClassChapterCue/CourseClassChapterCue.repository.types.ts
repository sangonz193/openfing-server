import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { TypedRepository } from "../_utils/TypedRepository"
import { CourseClassChapterCueEntitySchema, CourseClassChapterCueRow } from "./CourseClassChapterCue.entity.types"

export type CourseClassChapterCueFindOneOptions = {
	id: CourseClassChapterCueRow["id"]
}

export type CourseClassChapterCueFindAllOptions = {
	courseClassId: CourseClassChapterCueRow["course_class_id"]
}

export type SaveCourseClassChapterCueData = CourseClassChapterCueRow

export type CreateCourseClassChapterCueData = SafeOmit<
	CourseClassChapterCueRow,
	"id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id"
> &
	Partial<
		Pick<
			CourseClassChapterCueRow,
			"id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id"
		>
	>

export type CourseClassChapterCueRepository = {
	_typedRepository: TypedRepository<CourseClassChapterCueEntitySchema>

	findAll: (options: CourseClassChapterCueFindAllOptions) => Promise<CourseClassChapterCueRow[]>
	findBatch: (
		options: readonly CourseClassChapterCueFindOneOptions[]
	) => Promise<Array<CourseClassChapterCueRow | null>>

	is: (courseClassChapterCue: CourseClassChapterCueRow, findOptions: CourseClassChapterCueFindOneOptions) => boolean

	create: (data: CreateCourseClassChapterCueData) => SaveCourseClassChapterCueData
	save: (data: SaveCourseClassChapterCueData) => Promise<CourseClassChapterCueRow>

	deleteByCourseClassId: (courseClassId: string) => Promise<boolean>
}
