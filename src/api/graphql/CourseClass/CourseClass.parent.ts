import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { CourseClassRow } from "../../../database/CourseClass/CourseClass.entity.types"
import { getGraphQLCommonVisibilityValue } from "../_utils/getGraphQLCommonVisibilityValue"
import { CourseClass } from "../schemas.types"

export type CourseClassParent = Required<
	SafeOmit<CourseClassRow, "published_at" | "created_at" | "visibility" | "updated_at" | "deleted_at">
> &
	Pick<Required<CourseClass>, "__typename" | "publishedAt" | "visibility" | "createdAt" | "updatedAt">

export const getCourseClassParent = (courseClassRow: CourseClassRow): CourseClassParent => ({
	__typename: "CourseClass",
	...courseClassRow,
	visibility: courseClassRow.visibility && getGraphQLCommonVisibilityValue(courseClassRow.visibility),
	publishedAt: courseClassRow.published_at || null,
	createdAt: courseClassRow.created_at || null,
	updatedAt: courseClassRow.updated_at || null,
})
