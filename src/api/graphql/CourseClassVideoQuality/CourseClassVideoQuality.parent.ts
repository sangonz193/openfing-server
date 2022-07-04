import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { CourseClassVideoQualityRow } from "../../../database/CourseClassVideoQuality/CourseClassVideoQuality.entity.types"
import { CourseClassVideoQuality } from "../schemas.types"

export type CourseClassVideoQualityParent = Required<
	SafeOmit<CourseClassVideoQualityRow, "created_at" | "updated_at" | "deleted_at">
> &
	Pick<Required<CourseClassVideoQuality>, "__typename" | "id" | "createdAt" | "updatedAt" | "deletedAt">

export const getCourseClassVideoQualityParent = (
	courseClassVideoQualityRow: CourseClassVideoQualityRow
): CourseClassVideoQualityParent => ({
	__typename: "CourseClassVideoQuality",
	...courseClassVideoQualityRow,
	createdAt: courseClassVideoQualityRow.created_at || null,
	updatedAt: courseClassVideoQualityRow.updated_at || null,
	deletedAt: courseClassVideoQualityRow.deleted_at || null,
})
