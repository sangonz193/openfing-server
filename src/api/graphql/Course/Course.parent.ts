import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { appConfig } from "../../../app/app.config"
import { CourseRow } from "../../../database/Course/Course.entity.types"
import { getGraphQLCommonVisibilityValue } from "../_utils/getGraphQLCommonVisibilityValue"
import { Course } from "../schemas.types"

export type CourseParent = Required<
	SafeOmit<CourseRow, "name" | "visibility" | "created_at" | "updated_at" | "deleted_at">
> &
	Pick<
		Required<Course>,
		"__typename" | "id" | "name" | "visibility" | "createdAt" | "updatedAt" | "deletedAt" | "iconUrl"
	>

export const getCourseParent = (courseRow: CourseRow): CourseParent => ({
	...courseRow,
	__typename: "Course",
	name: courseRow.name || "", // TODO: Fix
	iconUrl: courseRow.icon_url || appConfig.assets.defaultCourseIcon.url,
	visibility: courseRow.visibility && getGraphQLCommonVisibilityValue(courseRow.visibility),
	createdAt: courseRow.created_at || null,
	updatedAt: courseRow.updated_at || null,
	deletedAt: courseRow.deleted_at || null,
})
