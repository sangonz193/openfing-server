import { ColumnsOptions } from "../_utils/ColumnsOptions"
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { RelationsOptions } from "../_utils/RelationsOptions"
import {
	CourseClassLiveStateColumns,
	CourseClassLiveStateEntitySchema,
	CourseClassLiveStateRelations,
} from "./CourseClassLiveState.entity.types"

export const courseClassLiveStateColumns: ColumnsOptions<CourseClassLiveStateColumns> = {
	id: {
		name: "id",
		type: "uuid",
		primary: true,
	},

	start_date: {
		name: "start_date",
		type: "timestamp with time zone",
		nullable: true,
	},
	in_progress: {
		name: "in_progress",
		type: "boolean",
		nullable: true,
	},
	html: {
		name: "html",
		type: "text",
		nullable: true,
	},
	course_class_id: {
		name: "course_class_id",
		type: "uuid",
	},
}

export const courseClassLiveStateRelations: RelationsOptions<CourseClassLiveStateRelations> = {
	courseClass: {
		name: "courseClass",
		type: "many-to-one",
		inverseSide: "liveState",
		target: "course_class",
		joinColumn: {
			name: "course_class_id",
			referencedColumnName: "id",
		},
	},
}

export const courseClassLiveStateEntitySchema = createTypedEntitySchema<CourseClassLiveStateEntitySchema>({
	name: "course_class_live_state",
	columns: courseClassLiveStateColumns,
	relations: courseClassLiveStateRelations,
})
