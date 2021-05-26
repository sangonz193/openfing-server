import { CourseClassListRow } from "../../../../database/CourseClassList/CourseClassList.entity.types"
import { CourseClassListParent, getCourseClassListParent } from "../../CourseClassList/CourseClassList.parent"
import { UpdateCourseClassListPayload } from "../../schemas.types"

export type UpdateCourseClassListPayloadParent = Pick<Required<UpdateCourseClassListPayload>, "__typename"> & {
	courseClassList: CourseClassListParent
}

export const getUpdateCourseClassListPayload = (updateCourseClassListPayload: {
	courseClassList: CourseClassListRow
}): UpdateCourseClassListPayloadParent => ({
	__typename: "UpdateCourseClassListPayload",
	courseClassList: getCourseClassListParent(updateCourseClassListPayload.courseClassList),
})
