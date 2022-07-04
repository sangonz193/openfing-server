import { BidirectionalRelation } from "../_utils/BidirectionalRelation"
import { FieldColumn, PrimaryColumn } from "../_utils/Column"
import { EntityRow, TypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { NamedColumns } from "../_utils/NamedColumns"
import { NamedRelations } from "../_utils/NamedRelations"
import { CourseClassEntitySchema } from "../CourseClass/CourseClass.entity.types"

export type CourseClassLiveState_id = PrimaryColumn<"uuid">
export type CourseClassLiveState_startDate = FieldColumn<{
	name: "start_date"
	sqlType: "timestamp with time zone"
}>
export type CourseClassLiveState_html = FieldColumn<{ name: "html"; sqlType: "text"; nullable: true }>
export type CourseClassLiveState_inProgress = FieldColumn<{ name: "in_progress"; sqlType: "boolean"; nullable: true }>

export type CourseClassToCourseClassLiveState = BidirectionalRelation<{
	from: {
		entity: CourseClassEntitySchema
		relationName: "liveState"
	}
	to: {
		entity: CourseClassLiveStateEntitySchema
		columnName: "course_class_id"
		relationName: "courseClass"
		nullable: false
	}
}>

export type CourseClassLiveStateColumns = NamedColumns<{
	id: CourseClassLiveState_id

	startDate: CourseClassLiveState_startDate
	inProgress: CourseClassLiveState_inProgress
	html: CourseClassLiveState_html
	courseClassId: CourseClassToCourseClassLiveState["to"]["column"]
}>

export type CourseClassLiveStateRelations = NamedRelations<{
	courseClass: CourseClassToCourseClassLiveState["to"]["relation"]
}>

export type CourseClassLiveStateEntitySchema = TypedEntitySchema<{
	name: "course_class_live_state"
	columns: CourseClassLiveStateColumns
	relations: CourseClassLiveStateRelations
}>

export type CourseClassLiveStateRow = EntityRow<CourseClassLiveStateEntitySchema>
