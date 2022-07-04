import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { CourseClassListRow } from "../../../database/CourseClassList/CourseClassList.entity.types"
import { CourseClassList } from "../schemas.types"

export type CourseClassListParent = Required<
	SafeOmit<CourseClassListRow, "code" | "created_at" | "updated_at" | "deleted_at">
> &
	Pick<Required<CourseClassList>, "__typename" | "code" | "createdAt" | "updatedAt" | "deletedAt">

export const getCourseClassListParent = (courseClassListRow: CourseClassListRow): CourseClassListParent => ({
	__typename: "CourseClassList",
	...courseClassListRow,
	code: courseClassListRow.code || "", // TODO: Fix
	createdAt: courseClassListRow.created_at || null,
	updatedAt: courseClassListRow.updated_at || null,
	deletedAt: courseClassListRow.deleted_at || null,
})
