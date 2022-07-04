import { getCourseClassChapterCueParent } from "../../CourseClassChapterCue/CourseClassChapterCue.parent"
import { CreateCourseClassChapterCuePayload, ResolversParentTypes } from "../../schemas.types"

export type CreateCourseClassChapterCuePayloadParent = Pick<
	Required<CreateCourseClassChapterCuePayload>,
	"__typename"
> & {
	courseClassChapterCue: ResolversParentTypes["CourseClassChapterCue"]
}

export const getCreateCourseClassChapterCuePayloadParent = (
	courseClassChapterCueRow: Parameters<typeof getCourseClassChapterCueParent>[0]
): CreateCourseClassChapterCuePayloadParent => ({
	__typename: "CreateCourseClassChapterCuePayload",
	courseClassChapterCue: getCourseClassChapterCueParent(courseClassChapterCueRow),
})
