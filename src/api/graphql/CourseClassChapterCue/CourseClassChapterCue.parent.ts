import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { CourseClassChapterCueRow } from "../../../database/CourseClassChapterCue/CourseClassChapterCue.entity.types"
import { CourseClassChapterCue } from "../schemas.types"

export type CourseClassChapterCueParent = Required<
	SafeOmit<CourseClassChapterCueRow, "created_at" | "updated_at" | "deleted_at" | "start_seconds" | "end_seconds">
> &
	Pick<
		Required<CourseClassChapterCue>,
		"__typename" | "createdAt" | "updatedAt" | "deletedAt" | "startSeconds" | "endSeconds"
	>

export const getCourseClassChapterCueParent = (
	courseClassChapterCueRow: CourseClassChapterCueRow
): CourseClassChapterCueParent => ({
	__typename: "CourseClassChapterCue",
	...courseClassChapterCueRow,
	startSeconds: courseClassChapterCueRow.start_seconds,
	endSeconds: courseClassChapterCueRow.end_seconds,
	createdAt: courseClassChapterCueRow.created_at?.toISOString() || null,
	updatedAt: courseClassChapterCueRow.updated_at?.toISOString() || null,
	deletedAt: courseClassChapterCueRow.deleted_at?.toISOString() || null,
})
