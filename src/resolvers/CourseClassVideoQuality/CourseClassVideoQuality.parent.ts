import { SafeOmit } from "../../_utils/utilTypes";
import { CourseClassVideoQualityRow } from "../../entities/CourseClassVideoQuality/CourseClassVideoQuality.entity.types";
import { CourseClassVideoQuality } from "../../generated/graphql.types";

export type CourseClassVideoQualityParent = Required<
	SafeOmit<CourseClassVideoQualityRow, "created_at" | "updated_at" | "deleted_at">
> &
	Pick<Required<CourseClassVideoQuality>, "__typename" | "createdAt" | "updatedAt" | "deletedAt">;

export const getCourseClassVideoQualityParent = (
	courseClassVideoQualityRow: CourseClassVideoQualityRow
): CourseClassVideoQualityParent => ({
	__typename: "CourseClassVideoQuality",
	...courseClassVideoQualityRow,
	createdAt: courseClassVideoQualityRow.created_at?.toISOString() || null,
	updatedAt: courseClassVideoQualityRow.updated_at?.toISOString() || null,
	deletedAt: courseClassVideoQualityRow.deleted_at?.toISOString() || null,
});
