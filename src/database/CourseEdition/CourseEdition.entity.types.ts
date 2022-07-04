import { CourseToCourseEdition_courseEditions } from "../../database/Course/Course.entity.types"
import { BidirectionalRelation } from "../_utils/BidirectionalRelation"
import { CreatedByIdColumn, DeletedByIdColumn, FieldColumn, PrimaryColumn, UpdatedByIdColumn } from "../_utils/Column"
import { CommonVisibility } from "../_utils/CommonVisibility"
import { EntityRow, TypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { NamedColumns } from "../_utils/NamedColumns"
import { NamedRelations } from "../_utils/NamedRelations"
import { CourseClassListEntitySchema } from "../CourseClassList/CourseClassList.entity.types"

export type CourseEdition_id = PrimaryColumn<"uuid">
export type CourseEdition_name = FieldColumn<{ name: "name"; sqlType: "varchar" }>
export type CourseEdition_semester = FieldColumn<{ name: "semester"; sqlType: "integer"; nullable: false }>
export type CourseEdition_year = FieldColumn<{ name: "year"; sqlType: "integer" }>
export type CourseEdition_visibility = FieldColumn<{
	name: "visibility"
	sqlType: "varchar"
	typescriptType: CommonVisibility
}>
export type CourseEdition_createdAt = FieldColumn<{ name: "created_at"; sqlType: "timestamp with time zone" }>
export type CourseEdition_updatedAt = FieldColumn<{ name: "updated_at"; sqlType: "timestamp with time zone" }>
export type CourseEdition_deletedAt = FieldColumn<{ name: "deleted_at"; sqlType: "timestamp with time zone" }>

export type CourseEditionToCourseClassList_courseClassLists = BidirectionalRelation<{
	from: {
		entity: CourseEditionEntitySchema
		relationName: "courseClassLists"
	}
	to: {
		entity: CourseClassListEntitySchema
		columnName: "course_edition_id"
		relationName: "courseEdition"
		nullable: true
	}
}>

export type CourseEditionColumns = NamedColumns<{
	id: CourseEdition_id

	name: CourseEdition_name
	semester: CourseEdition_semester
	year: CourseEdition_year
	visibility: CourseEdition_visibility

	createdAt: CourseEdition_createdAt
	updatedAt: CourseEdition_updatedAt
	deletedAt: CourseEdition_deletedAt

	courseId: CourseToCourseEdition_courseEditions["to"]["column"]

	createdById: CreatedByIdColumn
	updatedById: UpdatedByIdColumn
	deletedById: DeletedByIdColumn
}>

export type CourseEditionRelations = NamedRelations<{
	course: CourseToCourseEdition_courseEditions["to"]["relation"]
	courseClassLists: CourseEditionToCourseClassList_courseClassLists["from"]["relation"]
}>

export type CourseEditionEntitySchema = TypedEntitySchema<{
	name: "course_edition"
	columns: CourseEditionColumns
	relations: CourseEditionRelations
}>

export type CourseEditionRow = EntityRow<CourseEditionEntitySchema>
