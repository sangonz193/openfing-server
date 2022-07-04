import { ColumnsOptions } from "../_utils/ColumnsOptions"
import { commonManagedColumnsOptions } from "../_utils/commonManagedColumnsOptions"
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { RelationsOptions } from "../_utils/RelationsOptions"
import {
	CourseClassVideoFormatColumns,
	CourseClassVideoFormatEntitySchema,
	CourseClassVideoFormatRelations,
} from "./CourseClassVideoFormat.entity.types"

export const courseClassVideoFormatColumns: ColumnsOptions<CourseClassVideoFormatColumns> = {
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
	url: {
		name: "url",
		type: "varchar",
		nullable: true,
	},

	created_at: commonManagedColumnsOptions.created_at,
	updated_at: commonManagedColumnsOptions.updated_at,
	deleted_at: commonManagedColumnsOptions.deleted_at,

	course_class_video_quality_id: {
		name: "course_class_video_quality_id",
		type: "uuid",
		nullable: true,
	},

	created_by_id: commonManagedColumnsOptions.created_by_id,
	updated_by_id: commonManagedColumnsOptions.updated_by_id,
	deleted_by_id: commonManagedColumnsOptions.deleted_by_id,
}

export const courseClassVideoFormatRelations: RelationsOptions<CourseClassVideoFormatRelations> = {
	courseClassVideoQuality: {
		name: "courseClassVideoQuality",
		type: "many-to-one",
		inverseSide: "courseClassVideoFormats",
		target: "course_class_video_quality",
		joinColumn: {
			name: "course_class_video_quality_id",
			referencedColumnName: "id",
		},
	},
}

export const courseClassVideoFormatEntitySchema = createTypedEntitySchema<CourseClassVideoFormatEntitySchema>({
	name: "course_class_video_format",
	columns: courseClassVideoFormatColumns,
	relations: courseClassVideoFormatRelations,
})
