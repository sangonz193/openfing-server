import { ColumnsOptions } from "../_utils/ColumnsOptions";
import { commonManagedColumnsOptions } from "../_utils/commonManagedColumnsOptions";
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema";
import { RelationsOptions } from "../_utils/RelationsOptions";
import { UserColumns, UserEntitySchema, UserRelations } from "./User.entity.types";

// TODO: delete

export const userColumns: ColumnsOptions<UserColumns> = {
	id: {
		name: "id",
		type: "uuid",
		primary: true,
	},

	email: {
		name: "email",
		type: "varchar",
	},
	uid: {
		name: "uid",
		type: "varchar",
		nullable: true,
	},
	password: {
		name: "password",
		type: "text",
	},
	name: {
		name: "name",
		type: "varchar",
		nullable: true,
	},

	created_at: commonManagedColumnsOptions.created_at,
	updated_at: commonManagedColumnsOptions.updated_at,
	deleted_at: commonManagedColumnsOptions.deleted_at,
};

export const userRelations: RelationsOptions<UserRelations> = {
	createdCourses: {
		name: "createdCourses",
		type: "one-to-many",
		inverseSide: "createdBy",
		target: "course",
	},
	updatedCourses: {
		name: "updatedCourses",
		type: "one-to-many",
		inverseSide: "updatedBy",
		target: "course",
	},
	deletedCourses: {
		name: "deletedCourses",
		type: "one-to-many",
		inverseSide: "deletedBy",
		target: "course",
	},

	createdCourseEditions: {
		name: "createdCourseEditions",
		type: "one-to-many",
		inverseSide: "createdBy",
		target: "course_edition",
	},
	updatedCourseEditions: {
		name: "updatedCourseEditions",
		type: "one-to-many",
		inverseSide: "updatedBy",
		target: "course_edition",
	},
	deletedCourseEditions: {
		name: "deletedCourseEditions",
		type: "one-to-many",
		inverseSide: "deletedBy",
		target: "course_edition",
	},

	createdCourseClassLists: {
		name: "createdCourseClassLists",
		type: "one-to-many",
		inverseSide: "createdBy",
		target: "course_class_list",
	},
	updatedCourseClassLists: {
		name: "updatedCourseClassLists",
		type: "one-to-many",
		inverseSide: "updatedBy",
		target: "course_class_list",
	},
	deletedCourseClassLists: {
		name: "deletedCourseClassLists",
		type: "one-to-many",
		inverseSide: "deletedBy",
		target: "course_class_list",
	},

	createdCourseClasses: {
		name: "createdCourseClasses",
		type: "one-to-many",
		inverseSide: "createdBy",
		target: "course_class",
	},
	updatedCourseClasses: {
		name: "updatedCourseClasses",
		type: "one-to-many",
		inverseSide: "updatedBy",
		target: "course_class",
	},
	deletedCourseClasses: {
		name: "deletedCourseClasses",
		type: "one-to-many",
		inverseSide: "deletedBy",
		target: "course_class",
	},

	createdCourseClassVideos: {
		name: "createdCourseClassVideos",
		type: "one-to-many",
		inverseSide: "createdBy",
		target: "course_class_video",
	},
	updatedCourseClassVideos: {
		name: "updatedCourseClassVideos",
		type: "one-to-many",
		inverseSide: "updatedBy",
		target: "course_class_video",
	},
	deletedCourseClassVideos: {
		name: "deletedCourseClassVideos",
		type: "one-to-many",
		inverseSide: "deletedBy",
		target: "course_class_video",
	},

	createdCourseClassVideoQualities: {
		name: "createdCourseClassVideoQualities",
		type: "one-to-many",
		inverseSide: "createdBy",
		target: "course_class_video_quality",
	},
	updatedCourseClassVideoQualities: {
		name: "updatedCourseClassVideoQualities",
		type: "one-to-many",
		inverseSide: "updatedBy",
		target: "course_class_video_quality",
	},
	deletedCourseClassVideoQualities: {
		name: "deletedCourseClassVideoQualities",
		type: "one-to-many",
		inverseSide: "deletedBy",
		target: "course_class_video_quality",
	},

	createdCourseClassVideoFormats: {
		name: "createdCourseClassVideoFormats",
		type: "one-to-many",
		inverseSide: "createdBy",
		target: "course_class_video_format",
	},
	updatedCourseClassVideoFormats: {
		name: "updatedCourseClassVideoFormats",
		type: "one-to-many",
		inverseSide: "updatedBy",
		target: "course_class_video_format",
	},
	deletedCourseClassVideoFormats: {
		name: "deletedCourseClassVideoFormats",
		type: "one-to-many",
		inverseSide: "deletedBy",
		target: "course_class_video_format",
	},

	createdFaqs: {
		name: "createdFaqs",
		type: "one-to-many",
		inverseSide: "createdBy",
		target: "faq",
	},
	updatedFaqs: {
		name: "updatedFaqs",
		type: "one-to-many",
		inverseSide: "updatedBy",
		target: "faq",
	},
	deletedFaqs: {
		name: "deletedFaqs",
		type: "one-to-many",
		inverseSide: "deletedBy",
		target: "faq",
	},

	userToUserRoles: {
		name: "userToUserRoles",
		type: "one-to-many",
		inverseSide: "user",
		target: "user_to_user_role",
	},
};

export const userEntitySchema = createTypedEntitySchema<UserEntitySchema>({
	name: "user",
	columns: userColumns,
	relations: userRelations,
});
