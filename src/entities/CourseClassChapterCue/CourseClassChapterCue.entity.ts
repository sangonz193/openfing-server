import { commonManagedAtColumns, commonManagedByColumns } from "../_utils/common";
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema";
import {
	CourseClassChapterCue as CourseClassChapterCueType,
	CourseClassChapterCueColumns,
	CourseClassChapterCueRelations,
} from "./CourseClassChapterCue.entity.types";

export const courseClassChapterCueColumns: CourseClassChapterCueColumns = {
	id: {
		name: "id",
		type: "uuid",
		primary: true,
	},

	name: {
		name: "name",
		type: "varchar",
		nullable: false,
	},
	startSeconds: {
		name: "start_seconds",
		nullable: false,
		type: "decimal",
	},
	endSeconds: {
		name: "end_seconds",
		nullable: false,
		type: "decimal",
	},

	createdAt: commonManagedAtColumns.createdAt,
	updatedAt: commonManagedAtColumns.updatedAt,
	deletedAt: commonManagedAtColumns.deletedAt,

	courseClassId: {
		name: "course_class_id",
		type: "integer",
		nullable: false,
	},

	createdById: commonManagedByColumns.createdById,
	updatedById: commonManagedByColumns.updatedById,
	deletedById: commonManagedByColumns.deletedById,
};

export const courseClassChapterCueRelations: CourseClassChapterCueRelations = {
	courseClass: {
		type: "many-to-one",
		inverseSide: "courseClassChapterCue",
		target: "course_class",
		joinColumn: {
			name: "course_class_id",
			referencedColumnName: "id",
		},
		name: "courseClass",
	},

	createdBy: {
		type: "many-to-one",
		inverseSide: "createdCourseClassChapterCues",
		target: "user",
		joinColumn: {
			name: "created_by_id",
			referencedColumnName: "id",
		},
		name: "createdBy",
	},
	updatedBy: {
		type: "many-to-one",
		inverseSide: "updatedCourseClassChapterCues",
		target: "user",
		joinColumn: {
			name: "updated_by_id",
			referencedColumnName: "id",
		},
		name: "updatedBy",
	},
	deletedBy: {
		type: "many-to-one",
		inverseSide: "deletedCourseClassChapterCues",
		target: "user",
		joinColumn: {
			name: "deleted_by_id",
			referencedColumnName: "id",
		},
		name: "deletedBy",
	},
};

export const CourseClassChapterCue: CourseClassChapterCueType = createTypedEntitySchema<CourseClassChapterCueType>({
	name: "course_class_chapter_cue",
	columns: courseClassChapterCueColumns,
	relations: courseClassChapterCueRelations,
});
