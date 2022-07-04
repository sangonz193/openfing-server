import { ColumnsOptions } from "../_utils/ColumnsOptions"
import { commonManagedColumnsOptions } from "../_utils/commonManagedColumnsOptions"
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { RelationsOptions } from "../_utils/RelationsOptions"
import {
	CourseClassVideoQualityColumns,
	CourseClassVideoQualityEntitySchema,
	CourseClassVideoQualityRelations,
} from "./CourseClassVideoQuality.entity.types"

export const courseClassVideoQualityColumns: ColumnsOptions<CourseClassVideoQualityColumns> = {
	id: {
		name: "id",
		type: "uuid",
		primary: true,
	},

	width: {
		name: "width",
		type: "integer",
		nullable: true,
	},
	height: {
		name: "height",
		type: "integer",
		nullable: true,
	},

	created_at: commonManagedColumnsOptions.created_at,
	updated_at: commonManagedColumnsOptions.updated_at,
	deleted_at: commonManagedColumnsOptions.deleted_at,

	course_class_video_id: {
		name: "course_class_video_id",
		type: "uuid",
		nullable: true,
	},

	created_by_id: commonManagedColumnsOptions.created_by_id,
	updated_by_id: commonManagedColumnsOptions.updated_by_id,
	deleted_by_id: commonManagedColumnsOptions.deleted_by_id,
}

export const courseClassVideoQualityRelations: RelationsOptions<CourseClassVideoQualityRelations> = {
	courseClassVideo: {
		name: "courseClassVideo",
		type: "many-to-one",
		inverseSide: "courseClassVideoQualities",
		target: "course_class_video",
		joinColumn: {
			name: "course_class_video_id",
			referencedColumnName: "id",
		},
	},
	courseClassVideoFormats: {
		name: "courseClassVideoFormats",
		type: "one-to-many",
		inverseSide: "courseClassVideoQuality",
		target: "course_class_video_format",
	},
}

export const courseClassVideoQualityEntitySchema = createTypedEntitySchema<CourseClassVideoQualityEntitySchema>({
	name: "course_class_video_quality",
	columns: courseClassVideoQualityColumns,
	relations: courseClassVideoQualityRelations,
})
