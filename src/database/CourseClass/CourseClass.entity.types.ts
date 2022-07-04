import { BidirectionalRelation } from "../_utils/BidirectionalRelation"
import { CreatedByIdColumn, DeletedByIdColumn, FieldColumn, PrimaryColumn, UpdatedByIdColumn } from "../_utils/Column"
import { CommonVisibility } from "../_utils/CommonVisibility"
import { EntityRow, TypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { NamedColumns } from "../_utils/NamedColumns"
import { NamedRelations } from "../_utils/NamedRelations"
import { CourseClassChapterCueEntitySchema } from "../CourseClassChapterCue/CourseClassChapterCue.entity.types"
import { CourseClassListToCourseClass_courseClasses } from "../CourseClassList/CourseClassList.entity.types"
import { CourseClassVideoEntitySchema } from "../CourseClassVideo/CourseClassVideo.entity.types"

export type CourseClass_id = PrimaryColumn<"uuid">
export type CourseClass_name = FieldColumn<{ name: "name"; sqlType: "varchar" }>
export type CourseClass_number = FieldColumn<{ name: "number"; sqlType: "smallint" }>
export type CourseClass_visibility = FieldColumn<{
	name: "visibility"
	sqlType: "varchar"
	typescriptType: CommonVisibility
}>
export type CourseClass_publishedAt = FieldColumn<{ name: "published_at"; sqlType: "timestamp with time zone" }>
export type CourseClass_createdAt = FieldColumn<{ name: "created_at"; sqlType: "timestamp with time zone" }>
export type CourseClass_updatedAt = FieldColumn<{ name: "updated_at"; sqlType: "timestamp with time zone" }>
export type CourseClass_deletedAt = FieldColumn<{ name: "deleted_at"; sqlType: "timestamp with time zone" }>

export type CourseClassToCourseClassVideo_videos = BidirectionalRelation<{
	from: {
		entity: CourseClassEntitySchema
		relationName: "courseClassVideos"
	}
	to: {
		entity: CourseClassVideoEntitySchema
		columnName: "course_class_id"
		relationName: "courseClass"
		nullable: true
	}
}>

export type CourseClassToCourseClassChapterCue_chapterCues = BidirectionalRelation<{
	from: {
		entity: CourseClassEntitySchema
		relationName: "courseClassChapterCue"
	}
	to: {
		entity: CourseClassChapterCueEntitySchema
		columnName: "course_class_id"
		relationName: "courseClass"
		nullable: false
	}
}>

export type CourseClassColumns = NamedColumns<{
	id: CourseClass_id

	name: CourseClass_name
	number: CourseClass_number
	visibility: CourseClass_visibility
	publishedAt: CourseClass_publishedAt

	createdAt: CourseClass_createdAt
	updatedAt: CourseClass_updatedAt
	deletedAt: CourseClass_deletedAt

	courseClassListId: CourseClassListToCourseClass_courseClasses["to"]["column"]

	createdById: CreatedByIdColumn
	updatedById: UpdatedByIdColumn
	deletedById: DeletedByIdColumn
}>

export type CourseClassRelations = NamedRelations<{
	courseClassList: CourseClassListToCourseClass_courseClasses["to"]["relation"]
	courseClassVideos: CourseClassToCourseClassVideo_videos["from"]["relation"]
}>

export type CourseClassEntitySchema = TypedEntitySchema<{
	name: "course_class"
	columns: CourseClassColumns
	relations: CourseClassRelations
}>

export type CourseClassRow = EntityRow<CourseClassEntitySchema>
