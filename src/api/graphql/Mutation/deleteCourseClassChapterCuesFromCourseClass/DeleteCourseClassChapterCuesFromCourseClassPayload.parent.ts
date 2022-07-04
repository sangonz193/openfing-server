import { CourseClassRow } from "../../../../database/CourseClass/CourseClass.entity.types"
import { getCourseClassParent } from "../../CourseClass/CourseClass.parent"
import { DeleteCourseClassChapterCuesFromCourseClassPayload, ResolversParentTypes } from "../../schemas.types"

export type DeleteCourseClassChapterCuesFromCourseClassPayloadParent = Pick<
	Required<DeleteCourseClassChapterCuesFromCourseClassPayload>,
	"__typename"
> & {
	courseClass: ResolversParentTypes["CourseClass"]
}

export const getDeleteCourseClassChapterCuesFromCourseClassPayloadParent = (
	courseClassRow: CourseClassRow
): DeleteCourseClassChapterCuesFromCourseClassPayloadParent => ({
	__typename: "DeleteCourseClassChapterCuesFromCourseClassPayload",
	courseClass: getCourseClassParent(courseClassRow),
})
