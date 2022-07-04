import { CourseRow } from "../../../../database/Course/Course.entity.types"
import { CourseParent, getCourseParent } from "../../Course/Course.parent"
import { UpdateCoursePayload } from "../../schemas.types"

export type UpdateCoursePayloadParent = Pick<Required<UpdateCoursePayload>, "__typename"> & {
	course: CourseParent
}

export const getUpdateCoursePayload = (updateCoursePayload: { course: CourseRow }): UpdateCoursePayloadParent => ({
	__typename: "UpdateCoursePayload",
	course: getCourseParent(updateCoursePayload.course),
})
