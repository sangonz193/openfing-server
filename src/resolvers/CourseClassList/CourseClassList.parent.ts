import { SafeOmit } from "../../_utils/utilTypes";
import { CourseClassListRow } from "../../entities/CourseClassList/CourseClassList.entity.types";
import { CourseClassList } from "../../generated/graphql.types";

export type CourseClassListParent = Required<
	SafeOmit<CourseClassListRow, "code" | "created_at" | "updated_at" | "deleted_at">
> &
	Pick<Required<CourseClassList>, "__typename" | "code" | "createdAt" | "updatedAt" | "deletedAt">;

export const getCourseClassListParent = (courseClassListRow: CourseClassListRow): CourseClassListParent => ({
	__typename: "CourseClassList",
	...courseClassListRow,
	code: courseClassListRow.code || "", // TODO: Fix
	createdAt: courseClassListRow.created_at?.toISOString() || null,
	updatedAt: courseClassListRow.updated_at?.toISOString() || null,
	deletedAt: courseClassListRow.deleted_at?.toISOString() || null,
});
