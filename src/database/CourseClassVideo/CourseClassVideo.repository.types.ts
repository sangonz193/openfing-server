import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { TypedRepository } from "../_utils/TypedRepository"
import { CourseClassVideoEntitySchema, CourseClassVideoRow } from "./CourseClassVideo.entity.types"

export type CourseClassVideoAccessOptions = {
	includeHidden?: boolean
	includeDisabled?: boolean
}

export type CourseClassVideoFindOneOptions = CourseClassVideoAccessOptions & {
	id: CourseClassVideoRow["id"]
}

export type CourseClassVideoFindAllOptions = CourseClassVideoAccessOptions & {
	courseClassId: CourseClassVideoRow["course_class_id"]
}

export type SaveCourseClassVideoData = CourseClassVideoRow

export type CreateCourseClassVideoData = SafeOmit<
	CourseClassVideoRow,
	"id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id"
> &
	Partial<
		Pick<CourseClassVideoRow, "id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id">
	>

export type CourseClassVideoRepository = {
	_typedRepository: TypedRepository<CourseClassVideoEntitySchema>

	findAll: (options: CourseClassVideoFindAllOptions) => Promise<CourseClassVideoRow[]>
	findBatch: (options: readonly CourseClassVideoFindOneOptions[]) => Promise<Array<CourseClassVideoRow | null>>

	is: (courseClassVideo: CourseClassVideoRow, findOptions: CourseClassVideoFindOneOptions) => boolean

	create: (data: CreateCourseClassVideoData) => SaveCourseClassVideoData
	save: (data: SaveCourseClassVideoData) => Promise<CourseClassVideoRow>
}
