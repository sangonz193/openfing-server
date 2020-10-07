import { SafeOmit } from "../../_utils/utilTypes";
import { CourseClassChapterCueRow } from "../../entities/CourseClassChapterCue/CourseClassChapterCue.entity.types";
import { CourseClassChapterCue } from "../../generated/graphql.types";

export type CourseClassChapterCueParent = Required<
	SafeOmit<CourseClassChapterCueRow, "createdAt" | "updatedAt" | "deletedAt">
> &
	Pick<Required<CourseClassChapterCue>, "__typename" | "createdAt" | "updatedAt" | "deletedAt">;

export const getCourseClassChapterCueParent = (
	courseClassChapterCueRow: CourseClassChapterCueRow
): CourseClassChapterCueParent => ({
	__typename: "CourseClassChapterCue",
	...courseClassChapterCueRow,
	createdAt: courseClassChapterCueRow.createdAt?.toISOString() || null,
	updatedAt: courseClassChapterCueRow.updatedAt?.toISOString() || null,
	deletedAt: courseClassChapterCueRow.deletedAt?.toISOString() || null,
});
