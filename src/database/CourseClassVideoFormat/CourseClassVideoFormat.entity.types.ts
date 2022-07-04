import { CreatedByIdColumn, DeletedByIdColumn, FieldColumn, PrimaryColumn, UpdatedByIdColumn } from "../_utils/Column"
import { EntityRow, TypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { NamedColumns } from "../_utils/NamedColumns"
import { NamedRelations } from "../_utils/NamedRelations"
import { CourseClassVideoQualityToCourseClassVideoFormat_courseClassVideoFormats } from "../CourseClassVideoQuality/CourseClassVideoQuality.entity.types"

export type CourseClassVideoFormat_id = PrimaryColumn<"uuid">
export type CourseClassVideoFormat_name = FieldColumn<{ name: "name"; sqlType: "varchar" }>
export type CourseClassVideoFormat_url = FieldColumn<{ name: "url"; sqlType: "varchar" }>
export type CourseClassVideoFormat_createdAt = FieldColumn<{ name: "created_at"; sqlType: "timestamp with time zone" }>
export type CourseClassVideoFormat_updatedAt = FieldColumn<{ name: "updated_at"; sqlType: "timestamp with time zone" }>
export type CourseClassVideoFormat_deletedAt = FieldColumn<{ name: "deleted_at"; sqlType: "timestamp with time zone" }>

export type CourseClassVideoFormatColumns = NamedColumns<{
	id: CourseClassVideoFormat_id

	name: CourseClassVideoFormat_name
	url: CourseClassVideoFormat_url

	createdAt: CourseClassVideoFormat_createdAt
	updatedAt: CourseClassVideoFormat_updatedAt
	deletedAt: CourseClassVideoFormat_deletedAt

	courseClassVideoQualityId: CourseClassVideoQualityToCourseClassVideoFormat_courseClassVideoFormats["to"]["column"]

	createdById: CreatedByIdColumn
	updatedById: UpdatedByIdColumn
	deletedById: DeletedByIdColumn
}>

export type CourseClassVideoFormatRelations = NamedRelations<{
	courseClassVideoQuality: CourseClassVideoQualityToCourseClassVideoFormat_courseClassVideoFormats["to"]["relation"]
}>

export type CourseClassVideoFormatEntitySchema = TypedEntitySchema<{
	name: "course_class_video_format"
	columns: CourseClassVideoFormatColumns
	relations: CourseClassVideoFormatRelations
}>

export type CourseClassVideoFormatRow = EntityRow<CourseClassVideoFormatEntitySchema>
