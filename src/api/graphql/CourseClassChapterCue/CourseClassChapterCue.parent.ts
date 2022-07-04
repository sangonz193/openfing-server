import { SafeOmit } from "@sangonz193/utils/SafeOmit"
import { parseISO } from "date-fns"

import { zapatosSchema } from "../../../database/zapatos/zapatos.schema"
import { CourseClassChapterCue } from "../schemas.types"

export type CourseClassChapterCueParent = Required<
	SafeOmit<
		zapatosSchema.course_class_chapter_cue.JSONSelectable,
		"created_at" | "updated_at" | "deleted_at" | "start_seconds" | "end_seconds"
	>
> &
	Pick<
		Required<CourseClassChapterCue>,
		"__typename" | "createdAt" | "updatedAt" | "deletedAt" | "startSeconds" | "endSeconds"
	>

export const getCourseClassChapterCueParent = (
	courseClassChapterCueRow: zapatosSchema.course_class_chapter_cue.JSONSelectable
): CourseClassChapterCueParent => ({
	__typename: "CourseClassChapterCue",
	...courseClassChapterCueRow,
	startSeconds: courseClassChapterCueRow.start_seconds,
	endSeconds: courseClassChapterCueRow.end_seconds,
	createdAt: courseClassChapterCueRow.created_at ? parseISO(courseClassChapterCueRow.created_at) : null,
	updatedAt: courseClassChapterCueRow.updated_at ? parseISO(courseClassChapterCueRow.updated_at) : null,
	deletedAt: courseClassChapterCueRow.deleted_at ? parseISO(courseClassChapterCueRow.deleted_at) : null,
})
