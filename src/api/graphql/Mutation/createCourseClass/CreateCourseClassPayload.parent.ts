import { CourseClassRow } from "../../../../database/CourseClass/CourseClass.entity.types"
import { CourseClassParent, getCourseClassParent } from "../../CourseClass/CourseClass.parent"
import { CreateCourseClassPayload } from "../../schemas.types"

export type CreateCourseClassPayloadParent = Pick<Required<CreateCourseClassPayload>, "__typename"> & {
	courseClass: CourseClassParent
}

export const getCreateCourseClassPayloadParent = (createCoursePayload: {
	courseClass: CourseClassRow
}): CreateCourseClassPayloadParent => ({
	__typename: "CreateCourseClassPayload",
	courseClass: getCourseClassParent(createCoursePayload.courseClass),
})
