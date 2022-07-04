import { CourseClassLiveStateRow } from "../../../../database/CourseClassLiveState/CourseClassLiveState.entity.types"
import {
	CourseClassLiveStateParent,
	getCourseClassLiveStateParent,
} from "../../CourseClassLiveState/CourseClassLiveState.parent"
import { SetCourseClassLiveStatePayload } from "../../schemas.types"

export type SetCourseClassLiveStatePayloadParent = Pick<Required<SetCourseClassLiveStatePayload>, "__typename"> & {
	courseClassLiveState: CourseClassLiveStateParent | null
}

export const getSetCourseClassLiveStatePayloadParent = (
	courseClassLiveState?: CourseClassLiveStateRow
): SetCourseClassLiveStatePayloadParent => ({
	__typename: "SetCourseClassLiveStatePayload",
	courseClassLiveState: courseClassLiveState ? getCourseClassLiveStateParent(courseClassLiveState) : null,
})
