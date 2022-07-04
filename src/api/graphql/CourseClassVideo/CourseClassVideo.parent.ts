import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { CourseClassVideoRow } from "../../../database/CourseClassVideo/CourseClassVideo.entity.types"
import { CourseClassVideo } from "../schemas.types"

export type CourseClassVideoParent = Required<
	SafeOmit<CourseClassVideoRow, "created_at" | "updated_at" | "deleted_at">
> &
	Pick<Required<CourseClassVideo>, "__typename" | "createdAt" | "updatedAt" | "deletedAt">

export const getCourseClassVideoParent = (courseClassVideoRow: CourseClassVideoRow): CourseClassVideoParent => ({
	__typename: "CourseClassVideo",
	...courseClassVideoRow,
	createdAt: courseClassVideoRow.created_at || null,
	updatedAt: courseClassVideoRow.updated_at || null,
	deletedAt: courseClassVideoRow.deleted_at || null,
})
