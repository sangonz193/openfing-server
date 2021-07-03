import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { TypedRepository } from "../_utils/TypedRepository"
import { CourseEntitySchema, CourseRow } from "./Course.entity.types"

export type CourseAccessOptions = {
	includeHidden?: boolean
	includeDisabled?: boolean
}

export type CourseFindOneOptions = CourseAccessOptions &
	(
		| {
				id: CourseRow["id"]
		  }
		| {
				code: CourseRow["code"]
		  }
	)

export type CourseFindAllOptions = CourseAccessOptions

export type InsertCourseData = CourseRow

export type CreateCourseData = SafeOmit<
	CourseRow,
	"id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id"
> &
	Partial<Pick<CourseRow, "id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id">>

export type CourseRepository = {
	_typedRepository: TypedRepository<CourseEntitySchema>

	findAll: (options?: CourseFindAllOptions) => Promise<CourseRow[]>
	findBatch: (options: readonly CourseFindOneOptions[]) => Promise<Array<CourseRow | null>>

	is: (course: CourseRow, findOptions: CourseFindOneOptions) => boolean

	create: (data: CreateCourseData) => InsertCourseData
	insert: (data: InsertCourseData) => Promise<CourseRow>
	createAndInsert: (data: CreateCourseData) => Promise<CourseRow>

	update: (
		id: CourseRow["id"],
		newValues: Partial<SafeOmit<CourseRow, "id" | "updated_at" | "updated_by_id">> &
			Required<Pick<CourseRow, "updated_by_id">>
	) => Promise<CourseRow>

	delete: (id: CourseRow["id"], data: Pick<Required<CourseRow>, "deleted_by_id">) => Promise<CourseRow>
}
