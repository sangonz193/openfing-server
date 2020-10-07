import {
	Column,
	EntityRow,
	OneToManyRelation,
	PrimaryColumn,
	TypedEntitySchema,
} from "../_utils/createTypedEntitySchema";
import { CourseClassChapterCue } from "../CourseClassChapterCue/CourseClassChapterCue.entity.types";
import { CourseClassListToCourseClass_courseClasses } from "../CourseClassList/CourseClassList.entity.types";
import { CourseClassVideo } from "../CourseClassVideo/CourseClassVideo.entity.types";
import {
	UserToCourseClass_created,
	UserToCourseClass_deleted,
	UserToCourseClass_updated,
} from "../User/User.entity.types";

export type CourseClass_id = PrimaryColumn<{ name: "id"; type: "integer"; entity: CourseClass }>;
export type CourseClass_name = Column<{ name: "name"; type: "varchar" }>;
export type CourseClass_number = Column<{ name: "number"; type: "smallint" }>;
export type CourseClass_visibility = Column<{ name: "visibility"; type: "varchar" }>;
export type CourseClass_createdAt = Column<{ name: "created_at"; type: "timestamp with time zone" }>;
export type CourseClass_updatedAt = Column<{ name: "updated_at"; type: "timestamp with time zone" }>;
export type CourseClass_deletedAt = Column<{ name: "deleted_at"; type: "timestamp with time zone" }>;

export type CourseClassToCourseClassVideo_videos = OneToManyRelation<{
	from: {
		entity: () => CourseClass;
		primaryColumn: CourseClass_id;
		relationName: "courseClassVideos";
	};
	to: {
		entity: () => CourseClassVideo;
		columnName: "course_class_id";
		relationName: "courseClass";
		nullable: true;
	};
}>;

export type CourseClassToCourseClassChapterCue_chapterCues = OneToManyRelation<{
	from: {
		entity: () => CourseClass;
		primaryColumn: CourseClass_id;
		relationName: "courseClassChapterCue";
	};
	to: {
		entity: () => CourseClassChapterCue;
		columnName: "course_class_id";
		relationName: "courseClass";
		nullable: false;
	};
}>;

export type CourseClassColumns = {
	id: CourseClass_id;

	name: CourseClass_name;
	number: CourseClass_number;
	visibility: CourseClass_visibility;

	createdAt: CourseClass_createdAt;
	updatedAt: CourseClass_updatedAt;
	deletedAt: CourseClass_deletedAt;

	courseClassListId: CourseClassListToCourseClass_courseClasses["to"]["column"];

	createdById: UserToCourseClass_created["to"]["column"];
	updatedById: UserToCourseClass_updated["to"]["column"];
	deletedById: UserToCourseClass_deleted["to"]["column"];
};

export type CourseClassRelations = {
	courseClassList: CourseClassListToCourseClass_courseClasses["to"]["relation"];
	courseClassVideos: CourseClassToCourseClassVideo_videos["from"]["relation"];

	createdBy: UserToCourseClass_created["to"]["relation"];
	updatedBy: UserToCourseClass_updated["to"]["relation"];
	deletedBy: UserToCourseClass_deleted["to"]["relation"];
};

export type CourseClass = TypedEntitySchema<{
	name: "course_class";
	columns: CourseClassColumns;
	relations: CourseClassRelations;
}>;

export type CourseClassRow = EntityRow<CourseClass>;
