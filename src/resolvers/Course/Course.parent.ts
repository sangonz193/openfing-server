import { SafeOmit } from "../../_utils/utilTypes";
import { CourseRow } from "../../entities/Course/Course.entity.types";
import { Course } from "../../generated/graphql.types";

export type CourseParent = Required<SafeOmit<CourseRow, "name" | "created_at" | "updated_at" | "deleted_at">> &
	Pick<Required<Course>, "__typename" | "name" | "createdAt" | "updatedAt" | "deletedAt">;

export const getCourseParent = (courseRow: CourseRow): CourseParent => ({
	...courseRow,
	__typename: "Course",
	name: courseRow.name || "", // TODO: Fix
	createdAt: courseRow.created_at?.toISOString() || null,
	updatedAt: courseRow.updated_at?.toISOString() || null,
	deletedAt: courseRow.deleted_at?.toISOString() || null,
});
