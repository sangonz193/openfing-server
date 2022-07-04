import { CreatedByIdColumn, DeletedByIdColumn, FieldColumn, PrimaryColumn, UpdatedByIdColumn } from "../_utils/Column"
import { EntityRow, TypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { NamedColumns } from "../_utils/NamedColumns"
import { NamedRelations } from "../_utils/NamedRelations"
import { CourseClassToCourseClassChapterCue_chapterCues } from "../CourseClass/CourseClass.entity.types"

export type CourseClassChapterCue_id = PrimaryColumn<"uuid">
export type CourseClassChapterCue_name = FieldColumn<{ name: "name"; sqlType: "varchar"; nullable: false }>
export type CourseClassChapterCue_startSeconds = FieldColumn<{
	name: "start_seconds"
	sqlType: "decimal"
	nullable: false
}>
export type CourseClassChapterCue_endSeconds = FieldColumn<{
	name: "end_seconds"
	sqlType: "decimal"
	nullable: false
}>
export type CourseClassChapterCue_createdAt = FieldColumn<{ name: "created_at"; sqlType: "timestamp with time zone" }>
export type CourseClassChapterCue_updatedAt = FieldColumn<{ name: "updated_at"; sqlType: "timestamp with time zone" }>
export type CourseClassChapterCue_deletedAt = FieldColumn<{ name: "deleted_at"; sqlType: "timestamp with time zone" }>

export type CourseClassChapterCueColumns = NamedColumns<{
	id: CourseClassChapterCue_id

	name: CourseClassChapterCue_name
	startSeconds: CourseClassChapterCue_startSeconds
	endSeconds: CourseClassChapterCue_endSeconds

	createdAt: CourseClassChapterCue_createdAt
	updatedAt: CourseClassChapterCue_updatedAt
	deletedAt: CourseClassChapterCue_deletedAt

	courseClassId: CourseClassToCourseClassChapterCue_chapterCues["to"]["column"]

	createdById: CreatedByIdColumn
	updatedById: UpdatedByIdColumn
	deletedById: DeletedByIdColumn
}>

export type CourseClassChapterCueRelations = NamedRelations<{
	courseClass: CourseClassToCourseClassChapterCue_chapterCues["to"]["relation"]
}>

export type CourseClassChapterCueEntitySchema = TypedEntitySchema<{
	name: "course_class_chapter_cue"
	columns: CourseClassChapterCueColumns
	relations: CourseClassChapterCueRelations
}>

export type CourseClassChapterCueRow = EntityRow<CourseClassChapterCueEntitySchema>
