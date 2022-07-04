import { ColumnsOptions } from "../_utils/ColumnsOptions"
import { commonManagedColumnsOptions } from "../_utils/commonManagedColumnsOptions"
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { RelationsOptions } from "../_utils/RelationsOptions"
import { CourseEditionColumns, CourseEditionEntitySchema, CourseEditionRelations } from "./CourseEdition.entity.types"

export const courseEditionColumns: ColumnsOptions<CourseEditionColumns> = {
	id: {
		name: "id",
		type: "uuid",
		primary: true,
	},

	name: {
		name: "name",
		type: "varchar",
		nullable: true,
	},
	semester: {
		name: "semester",
		type: "integer",
	},
	year: {
		name: "year",
		type: "integer",
		nullable: true,
	},
	visibility: {
		name: "visibility",
		type: "varchar",
		nullable: true,
	},

	created_at: commonManagedColumnsOptions.created_at,
	updated_at: commonManagedColumnsOptions.updated_at,
	deleted_at: commonManagedColumnsOptions.deleted_at,

	course_id: {
		name: "course_id",
		type: "uuid",
		nullable: true,
	},

	created_by_id: commonManagedColumnsOptions.created_by_id,
	updated_by_id: commonManagedColumnsOptions.updated_by_id,
	deleted_by_id: commonManagedColumnsOptions.deleted_by_id,
}

export const courseEditionRelations: RelationsOptions<CourseEditionRelations> = {
	course: {
		name: "course",
		type: "many-to-one",
		inverseSide: "courseEditions",
		target: "course",
		joinColumn: {
			name: "course_id",
			referencedColumnName: "id",
		},
	},
	courseClassLists: {
		name: "courseClassLists",
		type: "one-to-many",
		inverseSide: "courseEdition",
		target: "course_class_list",
	},
}

export const courseEditionEntitySchema = createTypedEntitySchema<CourseEditionEntitySchema>({
	name: "course_edition",
	columns: courseEditionColumns,
	relations: courseEditionRelations,
})
