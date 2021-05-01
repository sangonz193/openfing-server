import { SafeOmit } from "../../_utils/utilTypes";
import { CourseClassVideoRow } from "../../entities/CourseClassVideo/CourseClassVideo.entity.types";
import { CourseClassVideo } from "../../generated/graphql.types";

export type CourseClassVideoParent = Required<
	SafeOmit<CourseClassVideoRow, "created_at" | "updated_at" | "deleted_at">
> &
	Pick<Required<CourseClassVideo>, "__typename" | "createdAt" | "updatedAt" | "deletedAt">;

export const getCourseClassVideoParent = (courseClassVideoRow: CourseClassVideoRow): CourseClassVideoParent => ({
	__typename: "CourseClassVideo",
	...courseClassVideoRow,
	createdAt: courseClassVideoRow.created_at?.toISOString() || null,
	updatedAt: courseClassVideoRow.updated_at?.toISOString() || null,
	deletedAt: courseClassVideoRow.deleted_at?.toISOString() || null,
});
