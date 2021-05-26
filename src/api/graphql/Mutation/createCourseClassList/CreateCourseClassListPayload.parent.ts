import { CourseClassListRow } from "../../../../database/CourseClassList/CourseClassList.entity.types"
import { CourseClassListParent, getCourseClassListParent } from "../../CourseClassList/CourseClassList.parent"
import { CreateCourseClassListPayload } from "../../schemas.types"

export type CreateCourseClassListPayloadParent = Pick<Required<CreateCourseClassListPayload>, "__typename"> & {
	courseClassList: CourseClassListParent
}

export const getCreateCourseClassListPayloadParent = (createCoursePayload: {
	courseClassList: CourseClassListRow
}): CreateCourseClassListPayloadParent => ({
	__typename: "CreateCourseClassListPayload",
	courseClassList: getCourseClassListParent(createCoursePayload.courseClassList),
})
