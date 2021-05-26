import { CourseClassRow } from "../../../../database/CourseClass/CourseClass.entity.types"
import { CourseClassParent, getCourseClassParent } from "../../CourseClass/CourseClass.parent"
import { UpdateCourseClassPayload } from "../../schemas.types"

export type UpdateCourseClassPayloadParent = Pick<Required<UpdateCourseClassPayload>, "__typename"> & {
	courseClass: CourseClassParent
}

export const getUpdateCourseClassPayload = (updateCourseClassPayload: {
	courseClass: CourseClassRow
}): UpdateCourseClassPayloadParent => ({
	__typename: "UpdateCourseClassPayload",
	courseClass: getCourseClassParent(updateCourseClassPayload.courseClass),
})
