import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { appConfig } from "../../../config/app.config"
import { CourseRow } from "../../../database/Course/Course.entity.types"
import { Course } from "../schemas.types"

export type CourseParent = Required<SafeOmit<CourseRow, "name" | "created_at" | "updated_at" | "deleted_at">> &
	Pick<Required<Course>, "__typename" | "id" | "name" | "createdAt" | "updatedAt" | "deletedAt" | "iconUrl">

export const getCourseParent = (courseRow: CourseRow): CourseParent => ({
	...courseRow,
	__typename: "Course",
	name: courseRow.name || "", // TODO: Fix
	iconUrl: courseRow.icon_url || appConfig.assets.defaultCourseIcon.url,
	createdAt: courseRow.created_at?.toISOString() || null,
	updatedAt: courseRow.updated_at?.toISOString() || null,
	deletedAt: courseRow.deleted_at?.toISOString() || null,
})
