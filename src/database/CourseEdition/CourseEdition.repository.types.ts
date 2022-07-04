import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { TypedRepository } from "../_utils/TypedRepository"
import { CourseRow } from "../Course/Course.entity.types"
import { CourseEditionEntitySchema, CourseEditionRow } from "./CourseEdition.entity.types"

export type CourseEditionAccessOptions = {
	includeHidden?: boolean
	includeDisabled?: boolean
}

export type CourseEditionFindOneOptions = CourseEditionAccessOptions & {
	id: CourseEditionRow["id"]
}

export type CourseEditionFindAllOptions = CourseEditionAccessOptions & {
	courseId: CourseRow["id"]
}

export type SaveCourseEditionData = CourseEditionRow

export type CreateCourseEditionData = SafeOmit<
	CourseEditionRow,
	"id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id"
> &
	Partial<
		Pick<CourseEditionRow, "id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id">
	>

export type CourseEditionRepository = {
	_typedRepository: TypedRepository<CourseEditionEntitySchema>

	findAll: (options: CourseEditionFindAllOptions) => Promise<CourseEditionRow[]>
	findBatch: (options: readonly CourseEditionFindOneOptions[]) => Promise<Array<CourseEditionRow | null>>

	is: (courseEdition: CourseEditionRow, findOptions: CourseEditionFindOneOptions) => boolean

	create: (data: CreateCourseEditionData) => SaveCourseEditionData
	save: (data: SaveCourseEditionData) => Promise<CourseEditionRow>
}
