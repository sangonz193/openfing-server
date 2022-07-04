import { ColumnsOptions } from "../_utils/ColumnsOptions"
import { commonManagedColumnsOptions } from "../_utils/commonManagedColumnsOptions"
import { CommonVisibility } from "../_utils/CommonVisibility"
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { RelationsOptions } from "../_utils/RelationsOptions"
import {
	CourseClassVideoColumns,
	CourseClassVideoEntitySchema,
	CourseClassVideoRelations,
} from "./CourseClassVideo.entity.types"

export type CourseClassVideoVisibility = CommonVisibility

export const courseClassVideoColumns: ColumnsOptions<CourseClassVideoColumns> = {
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
	position: {
		name: "position",
		type: "smallint",
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

	course_class_id: {
		name: "course_class_id",
		type: "uuid",
		nullable: true,
	},

	created_by_id: commonManagedColumnsOptions.created_by_id,
	updated_by_id: commonManagedColumnsOptions.updated_by_id,
	deleted_by_id: commonManagedColumnsOptions.deleted_by_id,
}

export const courseClassVideoRelations: RelationsOptions<CourseClassVideoRelations> = {
	courseClass: {
		name: "courseClass",
		type: "many-to-one",
		inverseSide: "courseClassVideos",
		target: "course_class",
		joinColumn: {
			name: "course_class_id",
			referencedColumnName: "id",
		},
	},
	courseClassVideoQualities: {
		name: "courseClassVideoQualities",
		type: "one-to-many",
		inverseSide: "courseClassVideo",
		target: "course_class_video_quality",
	},
}

export const courseClassVideoEntitySchema = createTypedEntitySchema<CourseClassVideoEntitySchema>({
	name: "course_class_video",
	columns: courseClassVideoColumns,
	relations: courseClassVideoRelations,
})
