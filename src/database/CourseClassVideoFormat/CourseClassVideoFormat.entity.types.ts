import { FieldColumn, PrimaryColumn } from "../_utils/Column";
import { EntityRow, TypedEntitySchema } from "../_utils/createTypedEntitySchema";
import { NamedColumns } from "../_utils/NamedColumns";
import { NamedRelations } from "../_utils/NamedRelations";
import { CourseClassVideoQualityToCourseClassVideoFormat_courseClassVideoFormats } from "../CourseClassVideoQuality/CourseClassVideoQuality.entity.types";
import {
	UserToCourseClassVideoFormat_createdBy,
	UserToCourseClassVideoFormat_deletedBy,
	UserToCourseClassVideoFormat_updatedBy,
} from "../User/User.entity.types";

export type CourseClassVideoFormat_id = PrimaryColumn<"uuid">;
export type CourseClassVideoFormat_name = FieldColumn<{ name: "name"; sqlType: "varchar" }>;
export type CourseClassVideoFormat_url = FieldColumn<{ name: "url"; sqlType: "varchar" }>;
export type CourseClassVideoFormat_createdAt = FieldColumn<{ name: "created_at"; sqlType: "timestamp with time zone" }>;
export type CourseClassVideoFormat_updatedAt = FieldColumn<{ name: "updated_at"; sqlType: "timestamp with time zone" }>;
export type CourseClassVideoFormat_deletedAt = FieldColumn<{ name: "deleted_at"; sqlType: "timestamp with time zone" }>;

export type CourseClassVideoFormatColumns = NamedColumns<{
	id: CourseClassVideoFormat_id;

	name: CourseClassVideoFormat_name;
	url: CourseClassVideoFormat_url;

	createdAt: CourseClassVideoFormat_createdAt;
	updatedAt: CourseClassVideoFormat_updatedAt;
	deletedAt: CourseClassVideoFormat_deletedAt;

	courseClassVideoQualityId: CourseClassVideoQualityToCourseClassVideoFormat_courseClassVideoFormats["to"]["column"];

	createdById: UserToCourseClassVideoFormat_createdBy["to"]["column"];
	updatedById: UserToCourseClassVideoFormat_updatedBy["to"]["column"];
	deletedById: UserToCourseClassVideoFormat_deletedBy["to"]["column"];
}>;

export type CourseClassVideoFormatRelations = NamedRelations<{
	courseClassVideoQuality: CourseClassVideoQualityToCourseClassVideoFormat_courseClassVideoFormats["to"]["relation"];

	createdBy: UserToCourseClassVideoFormat_createdBy["to"]["relation"];
	updatedBy: UserToCourseClassVideoFormat_updatedBy["to"]["relation"];
	deletedBy: UserToCourseClassVideoFormat_deletedBy["to"]["relation"];
}>;

export type CourseClassVideoFormatEntitySchema = TypedEntitySchema<{
	name: "course_class_video_format";
	columns: CourseClassVideoFormatColumns;
	relations: CourseClassVideoFormatRelations;
}>;

export type CourseClassVideoFormatRow = EntityRow<CourseClassVideoFormatEntitySchema>;
