import { ColumnsOptions } from "../_utils/ColumnsOptions"
import { commonManagedColumnsOptions } from "../_utils/commonManagedColumnsOptions"
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { RelationsOptions } from "../_utils/RelationsOptions"
import {
	CourseClassChapterCueColumns,
	CourseClassChapterCueEntitySchema,
	CourseClassChapterCueRelations,
} from "./CourseClassChapterCue.entity.types"

export const courseClassChapterCueColumns: ColumnsOptions<CourseClassChapterCueColumns> = {
	id: {
		name: "id",
		type: "uuid",
		primary: true,
	},

	name: {
		name: "name",
		type: "varchar",
	},
	start_seconds: {
		name: "start_seconds",
		type: "decimal",
	},
	end_seconds: {
		name: "end_seconds",
		type: "decimal",
	},

	created_at: commonManagedColumnsOptions.created_at,
	updated_at: commonManagedColumnsOptions.updated_at,
	deleted_at: commonManagedColumnsOptions.deleted_at,

	course_class_id: {
		name: "course_class_id",
		type: "uuid",
	},

	created_by_id: commonManagedColumnsOptions.created_by_id,
	updated_by_id: commonManagedColumnsOptions.updated_by_id,
	deleted_by_id: commonManagedColumnsOptions.deleted_by_id,
}

export const courseClassChapterCueRelations: RelationsOptions<CourseClassChapterCueRelations> = {
	courseClass: {
		name: "courseClass",
		type: "many-to-one",
		inverseSide: "courseClassChapterCue",
		target: "course_class",
		joinColumn: {
			name: "course_class_id",
			referencedColumnName: "id",
		},
	},
}

export const courseClassChapterCueEntitySchema = createTypedEntitySchema<CourseClassChapterCueEntitySchema>({
	name: "course_class_chapter_cue",
	columns: courseClassChapterCueColumns,
	relations: courseClassChapterCueRelations,
})
