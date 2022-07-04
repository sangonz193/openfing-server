import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { TypedRepository } from "../_utils/TypedRepository"
import { CourseClassVideoFormatEntitySchema, CourseClassVideoFormatRow } from "./CourseClassVideoFormat.entity.types"

export type CourseClassVideoFormatFindOneOptions = {
	id: CourseClassVideoFormatRow["id"]
}

export type CourseClassVideoFormatFindAllOptions = {
	courseClassVideoQualityId: CourseClassVideoFormatRow["course_class_video_quality_id"]
}

export type InsertCourseClassVideoFormatData = CourseClassVideoFormatRow

export type CreateCourseClassVideoFormatData = SafeOmit<
	CourseClassVideoFormatRow,
	"id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id"
> &
	Partial<
		Pick<
			CourseClassVideoFormatRow,
			"id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id"
		>
	>

export type CourseClassVideoFormatRepository = {
	_typedRepository: TypedRepository<CourseClassVideoFormatEntitySchema>

	findAll: (options: CourseClassVideoFormatFindAllOptions) => Promise<CourseClassVideoFormatRow[]>
	findBatch: (
		options: readonly CourseClassVideoFormatFindOneOptions[]
	) => Promise<Array<CourseClassVideoFormatRow | null>>

	is: (
		courseClassVideoFormat: CourseClassVideoFormatRow,
		findOptions: CourseClassVideoFormatFindOneOptions
	) => boolean

	create: (data: CreateCourseClassVideoFormatData) => InsertCourseClassVideoFormatData
	insert: (data: InsertCourseClassVideoFormatData) => Promise<CourseClassVideoFormatRow>
	createAndInsert: (data: CreateCourseClassVideoFormatData) => Promise<CourseClassVideoFormatRow>

	update: (
		id: CourseClassVideoFormatRow["id"],
		newValues: Partial<SafeOmit<CourseClassVideoFormatRow, "id" | "updated_at" | "updated_by_id">> &
			Required<Pick<CourseClassVideoFormatRow, "updated_by_id">>
	) => Promise<CourseClassVideoFormatRow>

	delete: (
		id: CourseClassVideoFormatRow["id"],
		data: Pick<Required<CourseClassVideoFormatRow>, "deleted_by_id">
	) => Promise<CourseClassVideoFormatRow>
}
