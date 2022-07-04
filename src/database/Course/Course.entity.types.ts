import { BidirectionalRelation } from "../_utils/BidirectionalRelation"
import { CreatedByIdColumn, DeletedByIdColumn, FieldColumn, PrimaryColumn, UpdatedByIdColumn } from "../_utils/Column"
import { CommonVisibility } from "../_utils/CommonVisibility"
import { EntityRow, TypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { NamedColumns } from "../_utils/NamedColumns"
import { NamedRelations } from "../_utils/NamedRelations"
import { CourseEditionEntitySchema } from "../CourseEdition/CourseEdition.entity.types"

export type Course_id = PrimaryColumn<"uuid">
export type Course_name = FieldColumn<{ name: "name"; sqlType: "varchar" }>
export type Course_visibility = FieldColumn<{
	name: "visibility"
	sqlType: "varchar"
	typescriptType: CommonVisibility
}>
export type Course_code = FieldColumn<{ name: "code"; sqlType: "varchar"; nullable: false }>
export type Course_iconUrl = FieldColumn<{ name: "icon_url"; sqlType: "varchar" }>
export type Course_eva = FieldColumn<{ name: "eva"; sqlType: "varchar" }>
export type Course_createdAt = FieldColumn<{ name: "created_at"; sqlType: "timestamp with time zone" }>
export type Course_updatedAt = FieldColumn<{ name: "updated_at"; sqlType: "timestamp with time zone" }>
export type Course_deletedAt = FieldColumn<{ name: "deleted_at"; sqlType: "timestamp with time zone" }>

export type CourseToCourseEdition_courseEditions = BidirectionalRelation<{
	from: {
		entity: CourseEntitySchema
		relationName: "courseEditions"
	}
	to: {
		entity: CourseEditionEntitySchema
		columnName: "course_id"
		relationName: "course"
		nullable: true
	}
}>

export type CourseColumns = NamedColumns<{
	id: Course_id

	name: Course_name
	visibility: Course_visibility
	code: Course_code
	iconUrl: Course_iconUrl
	eva: Course_eva

	createdAt: Course_createdAt
	updatedAt: Course_updatedAt
	deletedAt: Course_deletedAt

	createdById: CreatedByIdColumn
	updatedById: UpdatedByIdColumn
	deletedById: DeletedByIdColumn
}>

export type CourseRelations = NamedRelations<{
	courseEditions: CourseToCourseEdition_courseEditions["from"]["relation"]
}>

export type CourseEntitySchema = TypedEntitySchema<{
	name: "course"
	columns: CourseColumns
	relations: CourseRelations
}>

export type CourseRow = EntityRow<CourseEntitySchema>
