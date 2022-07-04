import { BidirectionalRelation } from "../_utils/BidirectionalRelation"
import { CreatedByIdColumn, DeletedByIdColumn, FieldColumn, PrimaryColumn, UpdatedByIdColumn } from "../_utils/Column"
import { CommonVisibility } from "../_utils/CommonVisibility"
import { EntityRow, TypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { NamedColumns } from "../_utils/NamedColumns"
import { NamedRelations } from "../_utils/NamedRelations"
import { CourseClassEntitySchema } from "../CourseClass/CourseClass.entity.types"
import { CourseEditionToCourseClassList_courseClassLists } from "../CourseEdition/CourseEdition.entity.types"

export type CourseClassList_id = PrimaryColumn<"uuid">
export type CourseClassList_name = FieldColumn<{ name: "name"; sqlType: "varchar" }>
export type CourseClassList_code = FieldColumn<{ name: "code"; sqlType: "varchar" }>
export type CourseClassList_visibility = FieldColumn<{
	name: "visibility"
	sqlType: "varchar"
	typescriptType: CommonVisibility
}>
export type CourseClassList_createdAt = FieldColumn<{ name: "created_at"; sqlType: "timestamp with time zone" }>
export type CourseClassList_updatedAt = FieldColumn<{ name: "updated_at"; sqlType: "timestamp with time zone" }>
export type CourseClassList_deletedAt = FieldColumn<{ name: "deleted_at"; sqlType: "timestamp with time zone" }>

export type CourseClassListToCourseClass_courseClasses = BidirectionalRelation<{
	from: {
		entity: CourseClassListEntitySchema
		primaryColumn: CourseClassList_id
		relationName: "courseClasses"
	}
	to: {
		entity: CourseClassEntitySchema
		columnName: "course_class_list_id"
		relationName: "courseClassList"
		nullable: true
	}
}>

export type CourseClassListColumns = NamedColumns<{
	id: CourseClassList_id

	name: CourseClassList_name
	code: CourseClassList_code
	visibility: CourseClassList_visibility

	createdAt: CourseClassList_createdAt
	updatedAt: CourseClassList_updatedAt
	deletedAt: CourseClassList_deletedAt

	courseEditionId: CourseEditionToCourseClassList_courseClassLists["to"]["column"]

	createdById: CreatedByIdColumn
	updatedById: UpdatedByIdColumn
	deletedById: DeletedByIdColumn
}>

export type CourseClassListRelations = NamedRelations<{
	courseEdition: CourseEditionToCourseClassList_courseClassLists["to"]["relation"]
	courseClasses: CourseClassListToCourseClass_courseClasses["from"]["relation"]
}>

export type CourseClassListEntitySchema = TypedEntitySchema<{
	name: "course_class_list"
	columns: CourseClassListColumns
	relations: CourseClassListRelations
}>

export type CourseClassListRow = EntityRow<CourseClassListEntitySchema>
