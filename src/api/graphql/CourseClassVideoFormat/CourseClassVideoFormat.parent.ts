import { SafeOmit } from "@sangonz193/utils/SafeOmit";

import { CourseClassVideoFormatRow } from "../../../database/CourseClassVideoFormat/CourseClassVideoFormat.entity.types";
import { CourseClassVideoFormat } from "../schemas.types";

export type CourseClassVideoFormatParent = Required<
	SafeOmit<CourseClassVideoFormatRow, "created_at" | "updated_at" | "deleted_at">
> &
	Pick<Required<CourseClassVideoFormat>, "__typename" | "createdAt" | "updatedAt" | "deletedAt">;

export const getCourseClassVideoFormatParent = (
	courseClassVideoFormatRow: CourseClassVideoFormatRow
): CourseClassVideoFormatParent => ({
	__typename: "CourseClassVideoFormat",
	...courseClassVideoFormatRow,
	createdAt: courseClassVideoFormatRow.created_at?.toISOString() || null,
	updatedAt: courseClassVideoFormatRow.updated_at?.toISOString() || null,
	deletedAt: courseClassVideoFormatRow.deleted_at?.toISOString() || null,
});
