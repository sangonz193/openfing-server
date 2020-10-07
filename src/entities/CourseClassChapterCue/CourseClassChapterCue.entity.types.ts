import { Column, EntityRow, PrimaryColumn, TypedEntitySchema } from "../_utils/createTypedEntitySchema";
import { CourseClassToCourseClassChapterCue_chapterCues } from "../CourseClass/CourseClass.entity.types";
import {
	UserToCourseClassChapterCue_created,
	UserToCourseClassChapterCue_deleted,
	UserToCourseClassChapterCue_updated,
} from "../User/User.entity.types";

export type CourseClassChapterCue_id = PrimaryColumn<{ name: "id"; type: "uuid"; entity: CourseClassChapterCue }>;
export type CourseClassChapterCue_name = Column<{ name: "name"; type: "varchar" }>;
export type CourseClassChapterCue_startSeconds = Column<{ name: "start_seconds"; type: "decimal"; nullable: false }>;
export type CourseClassChapterCue_endSeconds = Column<{ name: "end_seconds"; type: "decimal"; nullable: false }>;
export type CourseClassChapterCue_createdAt = Column<{ name: "created_at"; type: "timestamp with time zone" }>;
export type CourseClassChapterCue_updatedAt = Column<{ name: "updated_at"; type: "timestamp with time zone" }>;
export type CourseClassChapterCue_deletedAt = Column<{ name: "deleted_at"; type: "timestamp with time zone" }>;

export type CourseClassChapterCueColumns = {
	id: CourseClassChapterCue_id;

	name: CourseClassChapterCue_name;
	startSeconds: CourseClassChapterCue_startSeconds;
	endSeconds: CourseClassChapterCue_endSeconds;

	createdAt: CourseClassChapterCue_createdAt;
	updatedAt: CourseClassChapterCue_updatedAt;
	deletedAt: CourseClassChapterCue_deletedAt;

	courseClassId: CourseClassToCourseClassChapterCue_chapterCues["to"]["column"];

	createdById: UserToCourseClassChapterCue_created["to"]["column"];
	updatedById: UserToCourseClassChapterCue_updated["to"]["column"];
	deletedById: UserToCourseClassChapterCue_deleted["to"]["column"];
};

export type CourseClassChapterCueRelations = {
	courseClass: CourseClassToCourseClassChapterCue_chapterCues["to"]["relation"];

	createdBy: UserToCourseClassChapterCue_created["to"]["relation"];
	updatedBy: UserToCourseClassChapterCue_updated["to"]["relation"];
	deletedBy: UserToCourseClassChapterCue_deleted["to"]["relation"];
};

export type CourseClassChapterCue = TypedEntitySchema<{
	name: "course_class_chapter_cue";
	columns: CourseClassChapterCueColumns;
	relations: CourseClassChapterCueRelations;
}>;

export type CourseClassChapterCueRow = EntityRow<CourseClassChapterCue>;
