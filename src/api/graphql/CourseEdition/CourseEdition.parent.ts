import { SafeOmit } from "../../../_utils/SafeOmit";
import { CourseEditionRow } from "../../../database/CourseEdition/CourseEdition.entity.types";
import { CourseEdition } from "../schemas.types";

export type CourseEditionParent = Required<SafeOmit<CourseEditionRow, "created_at" | "updated_at" | "deleted_at">> &
	Pick<Required<CourseEdition>, "__typename" | "createdAt" | "updatedAt" | "deletedAt">;

export const getCourseEditionParent = (courseEditionRow: CourseEditionRow): CourseEditionParent => ({
	__typename: "CourseEdition",
	...courseEditionRow,
	createdAt: courseEditionRow.created_at?.toISOString() || null,
	updatedAt: courseEditionRow.updated_at?.toISOString() || null,
	deletedAt: courseEditionRow.deleted_at?.toISOString() || null,
});
