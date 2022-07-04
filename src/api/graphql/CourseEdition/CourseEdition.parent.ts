import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { CourseEditionRow } from "../../../database/CourseEdition/CourseEdition.entity.types"
import { CourseEdition } from "../schemas.types"

export type CourseEditionParent = Required<SafeOmit<CourseEditionRow, "created_at" | "updated_at" | "deleted_at">> &
	Pick<Required<CourseEdition>, "__typename" | "id" | "createdAt" | "updatedAt" | "deletedAt">

export const getCourseEditionParent = (courseEditionRow: CourseEditionRow): CourseEditionParent => ({
	__typename: "CourseEdition",
	...courseEditionRow,
	createdAt: courseEditionRow.created_at || null,
	updatedAt: courseEditionRow.updated_at || null,
	deletedAt: courseEditionRow.deleted_at || null,
})
