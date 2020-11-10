import { SafeOmit } from "../../_utils/utilTypes";
import { CourseClassRow } from "../../entities/CourseClass/CourseClass.entity.types";
import { CourseClass } from "../../generated/graphql.types";

export type CourseClassParent = Required<
	SafeOmit<CourseClassRow, "publishedAt" | "createdAt" | "updatedAt" | "deletedAt">
> &
	Pick<Required<CourseClass>, "__typename" | "publishedAt" | "createdAt" | "updatedAt">;

export const getCourseClassParent = (courseClassRow: CourseClassRow): CourseClassParent => ({
	__typename: "CourseClass",
	...courseClassRow,
	publishedAt: courseClassRow.publishedAt?.toISOString() || null,
	createdAt: courseClassRow.createdAt?.toISOString() || null,
	updatedAt: courseClassRow.updatedAt?.toISOString() || null,
});
