import { ColumnsOptions } from "../_utils/ColumnsOptions"
import { commonManagedColumnsOptions } from "../_utils/commonManagedColumnsOptions"
import { CommonVisibility } from "../_utils/CommonVisibility"
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { RelationsOptions } from "../_utils/RelationsOptions"
import { CourseClassColumns, CourseClassEntitySchema, CourseClassRelations } from "./CourseClass.entity.types"

export type CourseClassVisibility = CommonVisibility

export const courseClassColumns: ColumnsOptions<CourseClassColumns> = {
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
	number: {
		name: "number",
		type: "smallint",
		nullable: true,
	},
	visibility: {
		name: "visibility",
		type: "varchar",
		nullable: true,
	},
	published_at: {
		name: "published_at",
		type: "timestamp with time zone",
		nullable: true,
	},

	course_class_list_id: {
		name: "course_class_list_id",
		type: "uuid",
		nullable: true,
	},

	created_at: commonManagedColumnsOptions.created_at,
	updated_at: commonManagedColumnsOptions.updated_at,
	deleted_at: commonManagedColumnsOptions.deleted_at,

	created_by_id: commonManagedColumnsOptions.created_by_id,
	updated_by_id: commonManagedColumnsOptions.updated_by_id,
	deleted_by_id: commonManagedColumnsOptions.deleted_by_id,
}

export const courseClassRelations: RelationsOptions<CourseClassRelations> = {
	courseClassList: {
		name: "courseClassList",
		type: "many-to-one",
		inverseSide: "courseClasses",
		target: "course_class_list",
		joinColumn: {
			name: "course_class_list_id",
			referencedColumnName: "id",
		},
	},
	courseClassVideos: {
		name: "courseClassVideos",
		type: "one-to-many",
		inverseSide: "courseClass",
		target: "course_class_video",
	},
}

export const courseClassEntitySchema = createTypedEntitySchema<CourseClassEntitySchema>({
	name: "course_class",
	columns: courseClassColumns,
	relations: courseClassRelations,
})
