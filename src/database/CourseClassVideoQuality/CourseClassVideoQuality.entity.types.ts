import { BidirectionalRelation } from "../_utils/BidirectionalRelation"
import { CreatedByIdColumn, DeletedByIdColumn, FieldColumn, PrimaryColumn, UpdatedByIdColumn } from "../_utils/Column"
import { EntityRow, TypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { NamedColumns } from "../_utils/NamedColumns"
import { NamedRelations } from "../_utils/NamedRelations"
import { CourseClassVideoToCourseClassVideoQuality_qualities } from "../CourseClassVideo/CourseClassVideo.entity.types"
import { CourseClassVideoFormatEntitySchema } from "../CourseClassVideoFormat/CourseClassVideoFormat.entity.types"

export type CourseClassVideoQuality_id = PrimaryColumn<"uuid">
export type CourseClassVideoQuality_width = FieldColumn<{ name: "width"; sqlType: "integer" }>
export type CourseClassVideoQuality_height = FieldColumn<{ name: "height"; sqlType: "integer" }>
export type CourseClassVideoQuality_createdAt = FieldColumn<{
	name: "created_at"
	sqlType: "timestamp with time zone"
}>
export type CourseClassVideoQuality_updatedAt = FieldColumn<{
	name: "updated_at"
	sqlType: "timestamp with time zone"
}>
export type CourseClassVideoQuality_deletedAt = FieldColumn<{
	name: "deleted_at"
	sqlType: "timestamp with time zone"
}>

export type CourseClassVideoQualityToCourseClassVideoFormat_courseClassVideoFormats = BidirectionalRelation<{
	from: {
		entity: CourseClassVideoQualityEntitySchema
		relationName: "courseClassVideoFormats"
	}
	to: {
		entity: CourseClassVideoFormatEntitySchema
		columnName: "course_class_video_quality_id"
		relationName: "courseClassVideoQuality"
		nullable: true
	}
}>

export type CourseClassVideoQualityColumns = NamedColumns<{
	id: CourseClassVideoQuality_id

	width: CourseClassVideoQuality_width
	height: CourseClassVideoQuality_height

	createdAt: CourseClassVideoQuality_createdAt
	updatedAt: CourseClassVideoQuality_updatedAt
	deletedAt: CourseClassVideoQuality_deletedAt

	courseClassVideoId: CourseClassVideoToCourseClassVideoQuality_qualities["to"]["column"]

	createdById: CreatedByIdColumn
	updatedById: UpdatedByIdColumn
	deletedById: DeletedByIdColumn
}>

export type CourseClassVideoQualityRelations = NamedRelations<{
	courseClassVideo: CourseClassVideoToCourseClassVideoQuality_qualities["to"]["relation"]
	courseClassVideoFormats: CourseClassVideoQualityToCourseClassVideoFormat_courseClassVideoFormats["from"]["relation"]
}>

export type CourseClassVideoQualityEntitySchema = TypedEntitySchema<{
	name: "course_class_video_quality"
	columns: CourseClassVideoQualityColumns
	relations: CourseClassVideoQualityRelations
}>

export type CourseClassVideoQualityRow = EntityRow<CourseClassVideoQualityEntitySchema>
