import { ColumnsOptions } from "../_utils/ColumnsOptions"
import { commonManagedColumnsOptions } from "../_utils/commonManagedColumnsOptions"
import { CommonVisibility } from "../_utils/CommonVisibility"
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { RelationsOptions } from "../_utils/RelationsOptions"
import { CourseColumns, CourseEntitySchema, CourseRelations } from "./Course.entity.types"

export type CourseVisibility = CommonVisibility

export const courseColumns: ColumnsOptions<CourseColumns> = {
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
	visibility: {
		name: "visibility",
		type: "varchar",
		nullable: true,
	},
	code: {
		name: "code",
		type: "varchar",
	},
	icon_url: {
		name: "icon_url",
		type: "varchar",
		nullable: true,
	},
	eva: {
		name: "eva",
		type: "varchar",
		nullable: true,
	},

	created_at: commonManagedColumnsOptions.created_at,
	updated_at: commonManagedColumnsOptions.updated_at,
	deleted_at: commonManagedColumnsOptions.deleted_at,

	created_by_id: commonManagedColumnsOptions.created_by_id,
	updated_by_id: commonManagedColumnsOptions.updated_by_id,
	deleted_by_id: commonManagedColumnsOptions.deleted_by_id,
}

const courseRelations: RelationsOptions<CourseRelations> = {
	courseEditions: {
		name: "courseEditions",
		type: "one-to-many",
		inverseSide: "course",
		target: "course_edition",
	},
}

export const courseEntitySchema = createTypedEntitySchema<CourseEntitySchema>({
	name: "course",
	columns: courseColumns,
	relations: courseRelations,
})
