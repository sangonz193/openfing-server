import { SafeOmit } from "@sangonz193/utils/SafeOmit";

import { CourseClassRow } from "../../../database/CourseClass/CourseClass.entity.types";
import { CourseClass } from "../schemas.types";

export type CourseClassParent = Required<
	SafeOmit<CourseClassRow, "published_at" | "created_at" | "updated_at" | "deleted_at">
> &
	Pick<Required<CourseClass>, "__typename" | "publishedAt" | "createdAt" | "updatedAt">;

export const getCourseClassParent = (courseClassRow: CourseClassRow): CourseClassParent => ({
	__typename: "CourseClass",
	...courseClassRow,
	publishedAt: courseClassRow.published_at?.toISOString() || null,
	createdAt: courseClassRow.created_at?.toISOString() || null,
	updatedAt: courseClassRow.updated_at?.toISOString() || null,
});
