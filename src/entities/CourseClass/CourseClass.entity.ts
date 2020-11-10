import { commonManagedAtColumns, commonManagedByColumns, commonVisibility } from "../_utils/common";
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema";
import { CourseClass as CourseClassType, CourseClassColumns, CourseClassRelations } from "./CourseClass.entity.types";

export const CourseClassVisibility = { ...commonVisibility };

export const courseClassColumns: CourseClassColumns = {
	id: {
		name: "id",
		type: "integer",
		primary: true,
		generated: "increment",
	},

	name: {
		name: "name",
		type: "varchar",
		nullable: true,
	},
	number: {
		name: "number",
		type: "smallint",
		nullable: true,
	},
	visibility: {
		name: "visibility",
		type: "varchar",
		nullable: true,
	},
	publishedAt: {
		name: "published_at",
		type: "timestamp with time zone",
		nullable: true,
	},

	createdAt: commonManagedAtColumns.createdAt,
	updatedAt: commonManagedAtColumns.updatedAt,
	deletedAt: commonManagedAtColumns.deletedAt,

	courseClassListId: {
		name: "course_class_list_id",
		type: "integer",
		nullable: true,
	},

	createdById: commonManagedByColumns.createdById,
	updatedById: commonManagedByColumns.updatedById,
	deletedById: commonManagedByColumns.deletedById,
};

export const courseClassRelations: CourseClassRelations = {
	courseClassList: {
		name: "courseClassList",
		type: "many-to-one",
		inverseSide: "courseClasses",
		target: "course_class_list",
		joinColumn: {
			name: "course_class_list_id",
			referencedColumnName: "id",
		},
	},
	courseClassVideos: {
		name: "courseClassVideos",
		type: "one-to-many",
		inverseSide: "courseClass",
		target: "course_class_video",
	},

	createdBy: {
		type: "many-to-one",
		inverseSide: "createdCourseClasses",
		target: "user",
		joinColumn: {
			name: "created_by_id",
			referencedColumnName: "id",
		},
		name: "createdBy",
	},
	updatedBy: {
		type: "many-to-one",
		inverseSide: "updatedCourseClasses",
		target: "user",
		joinColumn: {
			name: "updated_by_id",
			referencedColumnName: "id",
		},
		name: "updatedBy",
	},
	deletedBy: {
		type: "many-to-one",
		inverseSide: "deletedCourseClasses",
		target: "user",
		joinColumn: {
			name: "deleted_by_id",
			referencedColumnName: "id",
		},
		name: "deletedBy",
	},
};

export const CourseClass: CourseClassType = createTypedEntitySchema<CourseClassType>({
	name: "course_class",
	columns: courseClassColumns,
	relations: courseClassRelations,
});
