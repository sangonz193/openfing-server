import {
	Column,
	EntityRow,
	OneToManyRelation,
	PrimaryColumn,
	TypedEntitySchema,
} from "../_utils/createTypedEntitySchema";
import { Course } from "../Course/Course.entity.types";
import { CourseClass } from "../CourseClass/CourseClass.entity.types";
import { CourseClassChapterCue } from "../CourseClassChapterCue/CourseClassChapterCue.entity.types";
import { CourseClassList } from "../CourseClassList/CourseClassList.entity.types";
import { CourseClassVideo } from "../CourseClassVideo/CourseClassVideo.entity.types";
import { CourseClassVideoFormat } from "../CourseClassVideoFormat/CourseClassVideoFormat.entity.types";
import { CourseClassVideoQuality } from "../CourseClassVideoQuality/CourseClassVideoQuality.entity.types";
import { CourseEdition } from "../CourseEdition/CourseEdition.entity.types";
import { Faq } from "../Faq/Faq.entity.types";
import { UserToUserRole } from "../UserToUserRole/UserToUserRole.entity.types";

export type User_id = PrimaryColumn<{ name: "id"; type: "integer"; entity: User }>;
export type User_email = Column<{ name: "email"; type: "varchar"; nullable: false }>;
export type User_uid = Column<{ name: "uid"; type: "varchar" }>;
export type User_password = Column<{ name: "password"; type: "text"; nullable: false }>;
export type User_name = Column<{ name: "name"; type: "varchar" }>;
export type User_createdAt = Column<{ name: "created_at"; type: "timestamp with time zone" }>;
export type User_updatedAt = Column<{ name: "updated_at"; type: "timestamp with time zone" }>;
export type User_deletedAt = Column<{ name: "deleted_at"; type: "timestamp with time zone" }>;

export type UserToCourse_created = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "createdCourses";
	};
	to: {
		entity: () => Course;
		columnName: "created_by_id";
		relationName: "createdBy";
		nullable: true;
	};
}>;

export type UserToCourse_updated = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "updatedCourses";
	};
	to: {
		entity: () => Course;
		columnName: "updated_by_id";
		relationName: "updatedBy";
		nullable: true;
	};
}>;

export type UserToCourse_deleted = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "deletedCourses";
	};
	to: {
		entity: () => Course;
		columnName: "deleted_by_id";
		relationName: "deletedBy";
		nullable: true;
	};
}>;
// endregion

// region CourseEdition management
export type UserToCourseEdition_created = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "createdCourseEditions";
	};
	to: {
		entity: () => CourseEdition;
		columnName: "created_by_id";
		relationName: "createdBy";
		nullable: true;
	};
}>;

export type UserToCourseEdition_updated = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "updatedCourseEditions";
	};
	to: {
		entity: () => CourseEdition;
		columnName: "updated_by_id";
		relationName: "updatedBy";
		nullable: true;
	};
}>;

export type UserToCourseEdition_deleted = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "deletedCourseEditions";
	};
	to: {
		entity: () => CourseEdition;
		columnName: "deleted_by_id";
		relationName: "deletedBy";
		nullable: true;
	};
}>;
// endregion

// region CourseClassList management
export type UserToCourseClassList_created = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "createdCourseClassLists";
	};
	to: {
		entity: () => CourseClassList;
		columnName: "created_by_id";
		relationName: "createdBy";
		nullable: true;
	};
}>;

export type UserToCourseClassList_updated = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "updatedCourseClassLists";
	};
	to: {
		entity: () => CourseClassList;
		columnName: "updated_by_id";
		relationName: "updatedBy";
		nullable: true;
	};
}>;

export type UserToCourseClassList_deleted = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "deletedCourseClassLists";
	};
	to: {
		entity: () => CourseClassList;
		columnName: "deleted_by_id";
		relationName: "deletedBy";
		nullable: true;
	};
}>;
// endregion

// region CourseClass management
export type UserToCourseClass_created = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "createdCourseClasses";
	};
	to: {
		entity: () => CourseClass;
		columnName: "created_by_id";
		relationName: "createdBy";
		nullable: true;
	};
}>;

export type UserToCourseClass_updated = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "updatedCourseClasses";
	};
	to: {
		entity: () => CourseClass;
		columnName: "updated_by_id";
		relationName: "updatedBy";
		nullable: true;
	};
}>;

export type UserToCourseClass_deleted = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "deletedCourseClasses";
	};
	to: {
		entity: () => CourseClass;
		columnName: "deleted_by_id";
		relationName: "deletedBy";
		nullable: true;
	};
}>;
// endregion

// region CourseClassVideo management
export type UserToCourseClassVideo_created = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "createdCourseClassVideos";
	};
	to: {
		entity: () => CourseClassVideo;
		columnName: "created_by_id";
		relationName: "createdBy";
		nullable: true;
	};
}>;

export type UserToCourseClassVideo_updated = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "updatedCourseClassVideos";
	};
	to: {
		entity: () => CourseClassVideo;
		columnName: "updated_by_id";
		relationName: "updatedBy";
		nullable: true;
	};
}>;

export type UserToCourseClassVideo_deleted = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "deletedCourseClassVideos";
	};
	to: {
		entity: () => CourseClassVideo;
		columnName: "deleted_by_id";
		relationName: "deletedBy";
		nullable: true;
	};
}>;
// endregion

// region CourseClassVideo management
export type UserToCourseClassChapterCue_created = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "createdCourseClassChapterCues";
	};
	to: {
		entity: () => CourseClassChapterCue;
		columnName: "created_by_id";
		relationName: "createdBy";
		nullable: true;
	};
}>;

export type UserToCourseClassChapterCue_updated = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "updatedCourseClassChapterCues";
	};
	to: {
		entity: () => CourseClassVideo;
		columnName: "updated_by_id";
		relationName: "updatedBy";
		nullable: true;
	};
}>;

export type UserToCourseClassChapterCue_deleted = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "deletedCourseClassChapterCues";
	};
	to: {
		entity: () => CourseClassVideo;
		columnName: "deleted_by_id";
		relationName: "deletedBy";
		nullable: true;
	};
}>;

// endregion

// region CourseClassVideoQuality management
export type UserToCourseClassVideoQuality_created = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "createdCourseClassVideoQualities";
	};
	to: {
		entity: () => CourseClassVideoQuality;
		columnName: "created_by_id";
		relationName: "createdBy";
		nullable: true;
	};
}>;

export type UserToCourseClassVideoQuality_updated = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "updatedCourseClassVideoQualities";
	};
	to: {
		entity: () => CourseClassVideoQuality;
		columnName: "updated_by_id";
		relationName: "updatedBy";
		nullable: true;
	};
}>;

export type UserToCourseClassVideoQuality_deleted = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "deletedCourseClassVideoQualities";
	};
	to: {
		entity: () => CourseClassVideoQuality;
		columnName: "deleted_by_id";
		relationName: "deletedBy";
		nullable: true;
	};
}>;
// endregion

// region CourseClassVideoFormat management
export type UserToCourseClassVideoFormat_created = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "createdCourseClassVideoFormats";
	};
	to: {
		entity: () => CourseClassVideoFormat;
		columnName: "created_by_id";
		relationName: "createdBy";
		nullable: true;
	};
}>;

export type UserToCourseClassVideoFormat_updated = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "updatedCourseClassVideoFormats";
	};
	to: {
		entity: () => CourseClassVideoFormat;
		columnName: "updated_by_id";
		relationName: "updatedBy";
		nullable: true;
	};
}>;

export type UserToCourseClassVideoFormat_deleted = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "deletedCourseClassVideoFormats";
	};
	to: {
		entity: () => CourseClassVideoFormat;
		columnName: "deleted_by_id";
		relationName: "deletedBy";
		nullable: true;
	};
}>;
// endregion

// region Faq management
export type UserToFaq_created = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "createdFaqs";
	};
	to: {
		entity: () => Faq;
		columnName: "created_by_id";
		relationName: "createdBy";
		nullable: true;
	};
}>;

export type UserToFaq_updated = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "updatedFaqs";
	};
	to: {
		entity: () => Faq;
		columnName: "updated_by_id";
		relationName: "updatedBy";
		nullable: true;
	};
}>;

export type UserToFaq_deleted = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "deletedFaqs";
	};
	to: {
		entity: () => Faq;
		columnName: "deleted_by_id";
		relationName: "deletedBy";
		nullable: true;
	};
}>;
// endregion

export type UserToUserToUserRole_userToUserRoles = OneToManyRelation<{
	from: {
		entity: () => User;
		primaryColumn: User_id;
		relationName: "userToUserRoles";
	};
	to: {
		entity: () => UserToUserRole;
		columnName: "user_id";
		relationName: "user";
		nullable: false;
	};
}>;

export type UserColumns = {
	id: User_id;

	email: User_email;
	uid: User_uid;
	password: User_password;
	name: User_name;

	createdAt: User_createdAt;
	updatedAt: User_updatedAt;
	deletedAt: User_deletedAt;
};

export type UserRelations = {
	createdCourses: UserToCourse_created["from"]["relation"];
	updatedCourses: UserToCourse_updated["from"]["relation"];
	deletedCourses: UserToCourse_deleted["from"]["relation"];

	createdCourseEditions: UserToCourseEdition_created["from"]["relation"];
	updatedCourseEditions: UserToCourseEdition_updated["from"]["relation"];
	deletedCourseEditions: UserToCourseEdition_deleted["from"]["relation"];

	createdCourseClassLists: UserToCourseClassList_created["from"]["relation"];
	updatedCourseClassLists: UserToCourseClassList_updated["from"]["relation"];
	deletedCourseClassLists: UserToCourseClassList_deleted["from"]["relation"];

	createdCourseClasses: UserToCourseClass_created["from"]["relation"];
	updatedCourseClasses: UserToCourseClass_updated["from"]["relation"];
	deletedCourseClasses: UserToCourseClass_deleted["from"]["relation"];

	createdCourseClassVideos: UserToCourseClassVideo_created["from"]["relation"];
	updatedCourseClassVideos: UserToCourseClassVideo_updated["from"]["relation"];
	deletedCourseClassVideos: UserToCourseClassVideo_deleted["from"]["relation"];

	createdCourseClassVideoQualities: UserToCourseClassVideoQuality_created["from"]["relation"];
	updatedCourseClassVideoQualities: UserToCourseClassVideoQuality_updated["from"]["relation"];
	deletedCourseClassVideoQualities: UserToCourseClassVideoQuality_deleted["from"]["relation"];

	createdCourseClassVideoFormats: UserToCourseClassVideoFormat_created["from"]["relation"];
	updatedCourseClassVideoFormats: UserToCourseClassVideoFormat_updated["from"]["relation"];
	deletedCourseClassVideoFormats: UserToCourseClassVideoFormat_deleted["from"]["relation"];

	createdFaqs: UserToFaq_created["from"]["relation"];
	updatedFaqs: UserToFaq_updated["from"]["relation"];
	deletedFaqs: UserToFaq_deleted["from"]["relation"];

	userToUserRoles: UserToUserToUserRole_userToUserRoles["from"]["relation"];
};

export type User = TypedEntitySchema<{
	name: "user";
	columns: UserColumns;
	relations: UserRelations;
}>;

export type UserRow = EntityRow<User>;
