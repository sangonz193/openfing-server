import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { TypedRepository } from "../_utils/TypedRepository"
import { CourseClassVideoQualityEntitySchema, CourseClassVideoQualityRow } from "./CourseClassVideoQuality.entity.types"

export type CourseClassVideoQualityFindOneOptions = {
	id: CourseClassVideoQualityRow["id"]
}

export type CourseClassVideoQualityFindAllOptions = {
	courseClassVideoId: CourseClassVideoQualityRow["course_class_video_id"]
}

export type SaveCourseClassVideoQualityData = CourseClassVideoQualityRow

export type CreateCourseClassVideoQualityData = SafeOmit<
	CourseClassVideoQualityRow,
	"id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id"
> &
	Partial<
		Pick<
			CourseClassVideoQualityRow,
			"id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id"
		>
	>

export type CourseClassVideoQualityRepository = {
	_typedRepository: TypedRepository<CourseClassVideoQualityEntitySchema>

	findAll: (options: CourseClassVideoQualityFindAllOptions) => Promise<CourseClassVideoQualityRow[]>
	findBatch: (
		options: readonly CourseClassVideoQualityFindOneOptions[]
	) => Promise<Array<CourseClassVideoQualityRow | null>>

	is: (
		courseClassVideoQuality: CourseClassVideoQualityRow,
		findOptions: CourseClassVideoQualityFindOneOptions
	) => boolean

	create: (data: CreateCourseClassVideoQualityData) => SaveCourseClassVideoQualityData
	save: (data: SaveCourseClassVideoQualityData) => Promise<CourseClassVideoQualityRow>
}
