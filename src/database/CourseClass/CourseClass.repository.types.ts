import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { CourseClassEntitySchema, CourseClassRow } from "../../database/CourseClass/CourseClass.entity.types"
import { TypedRepository } from "../_utils/TypedRepository"
import { CourseClassListRow } from "../CourseClassList/CourseClassList.entity.types"

export type CourseClassRef =
	| {
			id: CourseClassRow["id"]
	  }
	| {
			courseClassListId: CourseClassListRow["id"]
			number: Exclude<CourseClassRow["number"], null>
	  }

export type CourseClassAccessOptions = {
	includeHidden?: boolean
	includeDisabled?: boolean
}

export type CourseClassFindOneOptions = CourseClassAccessOptions & CourseClassRef

export type CourseClassFindAllOptions =
	| (CourseClassAccessOptions & {
			courseClassListId: CourseClassRow["course_class_list_id"]
	  })
	| { latest: number }

export type InsertCourseClassData = CourseClassRow

export type CreateCourseClassData = SafeOmit<
	CourseClassRow,
	"id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id"
> &
	Partial<Pick<CourseClassRow, "id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id">>

export type CourseClassRepository = {
	_typedRepository: TypedRepository<CourseClassEntitySchema>

	findOne: (options: CourseClassFindOneOptions) => Promise<CourseClassRow | null>
	findBatch: (options: readonly CourseClassFindOneOptions[]) => Promise<Array<CourseClassRow | null>>
	findAll: (options: CourseClassFindAllOptions) => Promise<CourseClassRow[]>

	is: (courseClass: CourseClassRow, findOptions: CourseClassFindOneOptions) => boolean

	create: (data: CreateCourseClassData) => InsertCourseClassData
	insert: (data: InsertCourseClassData) => Promise<CourseClassRow>
	createAndInsert: (data: CreateCourseClassData) => Promise<CourseClassRow>

	update: (
		id: CourseClassRow["id"],
		newValues: Partial<SafeOmit<CourseClassRow, "id" | "updated_at" | "updated_by_id">> &
			Required<Pick<CourseClassRow, "updated_by_id">>
	) => Promise<CourseClassRow>

	delete: (id: CourseClassRow["id"], data: Pick<Required<CourseClassRow>, "deleted_by_id">) => Promise<CourseClassRow>
}
