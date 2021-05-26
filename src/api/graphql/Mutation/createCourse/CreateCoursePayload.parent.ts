import { CourseRow } from "../../../../database/Course/Course.entity.types"
import { CourseParent, getCourseParent } from "../../Course/Course.parent"
import { CreateCoursePayload } from "../../schemas.types"

export type CreateCoursePayloadParent = Pick<Required<CreateCoursePayload>, "__typename"> & {
	course: CourseParent
}

export const getCreateCoursePayloadParent = (createCoursePayload: {
	course: CourseRow
}): CreateCoursePayloadParent => ({
	__typename: "CreateCoursePayload",
	course: getCourseParent(createCoursePayload.course),
})
