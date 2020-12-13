import { SafeOmit } from "../../_utils/utilTypes";
import { CourseEditionRow } from "../../entities/CourseEdition/CourseEdition.entity.types";
import { CourseEdition } from "../../generated/graphql.types";

export type CourseEditionParent = Required<SafeOmit<CourseEditionRow, "created_at" | "updated_at" | "deleted_at">> &
	Pick<Required<CourseEdition>, "__typename" | "createdAt" | "updatedAt" | "deletedAt">;

export const getCourseEditionParent = (courseEditionRow: CourseEditionRow): CourseEditionParent => ({
	__typename: "CourseEdition",
	...courseEditionRow,
	createdAt: courseEditionRow.created_at?.toISOString() || null,
	updatedAt: courseEditionRow.updated_at?.toISOString() || null,
	deletedAt: courseEditionRow.deleted_at?.toISOString() || null,
});
