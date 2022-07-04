import { BidirectionalRelation } from "../_utils/BidirectionalRelation"
import { CreatedByIdColumn, DeletedByIdColumn, FieldColumn, PrimaryColumn, UpdatedByIdColumn } from "../_utils/Column"
import { CommonVisibility } from "../_utils/CommonVisibility"
import { EntityRow, TypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { NamedColumns } from "../_utils/NamedColumns"
import { NamedRelations } from "../_utils/NamedRelations"
import { CourseClassToCourseClassVideo_videos } from "../CourseClass/CourseClass.entity.types"
import { CourseClassVideoQualityEntitySchema } from "../CourseClassVideoQuality/CourseClassVideoQuality.entity.types"

export type CourseClassVideo_id = PrimaryColumn<"uuid">
export type CourseClassVideo_name = FieldColumn<{ name: "name"; sqlType: "varchar" }>
export type CourseClassVideo_position = FieldColumn<{ name: "position"; sqlType: "smallint" }>
export type CourseClassVideo_visibility = FieldColumn<{
	name: "visibility"
	sqlType: "varchar"
	typescriptType: CommonVisibility
}>
export type CourseClassVideo_createdAt = FieldColumn<{ name: "created_at"; sqlType: "timestamp with time zone" }>
export type CourseClassVideo_updatedAt = FieldColumn<{ name: "updated_at"; sqlType: "timestamp with time zone" }>
export type CourseClassVideo_deletedAt = FieldColumn<{ name: "deleted_at"; sqlType: "timestamp with time zone" }>

export type CourseClassVideoToCourseClassVideoQuality_qualities = BidirectionalRelation<{
	from: {
		entity: CourseClassVideoEntitySchema
		relationName: "courseClassVideoQualities"
	}
	to: {
		entity: CourseClassVideoQualityEntitySchema
		columnName: "course_class_video_id"
		relationName: "courseClassVideo"
		nullable: true
	}
}>

export type CourseClassVideoColumns = NamedColumns<{
	id: CourseClassVideo_id

	name: CourseClassVideo_name
	position: CourseClassVideo_position
	visibility: CourseClassVideo_visibility

	createdAt: CourseClassVideo_createdAt
	updatedAt: CourseClassVideo_updatedAt
	deletedAt: CourseClassVideo_deletedAt

	courseClassId: CourseClassToCourseClassVideo_videos["to"]["column"]

	createdById: CreatedByIdColumn
	updatedById: UpdatedByIdColumn
	deletedById: DeletedByIdColumn
}>

export type CourseClassVideoRelations = NamedRelations<{
	courseClass: CourseClassToCourseClassVideo_videos["to"]["relation"]
	courseClassVideoQualities: CourseClassVideoToCourseClassVideoQuality_qualities["from"]["relation"]
}>

export type CourseClassVideoEntitySchema = TypedEntitySchema<{
	name: "course_class_video"
	columns: CourseClassVideoColumns
	relations: CourseClassVideoRelations
}>

export type CourseClassVideoRow = EntityRow<CourseClassVideoEntitySchema>
