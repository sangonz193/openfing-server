import { ColumnsOptions } from "../_utils/ColumnsOptions"
import { commonManagedColumnsOptions } from "../_utils/commonManagedColumnsOptions"
import { CommonVisibility } from "../_utils/CommonVisibility"
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { RelationsOptions } from "../_utils/RelationsOptions"
import {
	CourseClassListColumns,
	CourseClassListEntitySchema,
	CourseClassListRelations,
} from "./CourseClassList.entity.types"

export type CourseClassListVisibility = CommonVisibility

export const courseClassListColumns: ColumnsOptions<CourseClassListColumns> = {
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
	code: {
		name: "code",
		type: "varchar",
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

	course_edition_id: {
		name: "course_edition_id",
		type: "uuid",
		nullable: true,
	},

	created_by_id: commonManagedColumnsOptions.created_by_id,
	updated_by_id: commonManagedColumnsOptions.updated_by_id,
	deleted_by_id: commonManagedColumnsOptions.deleted_by_id,
}

export const courseClassListRelations: RelationsOptions<CourseClassListRelations> = {
	courseEdition: {
		name: "courseEdition",
		type: "many-to-one",
		inverseSide: "courseClassLists",
		target: "course_edition",
		joinColumn: {
			name: "course_edition_id",
			referencedColumnName: "id",
		},
	},
	courseClasses: {
		name: "courseClasses",
		type: "one-to-many",
		inverseSide: "courseClassList",
		target: "course_class",
	},
}

export const courseClassListEntitySchema = createTypedEntitySchema<CourseClassListEntitySchema>({
	name: "course_class_list",
	columns: courseClassListColumns,
	relations: courseClassListRelations,
})
