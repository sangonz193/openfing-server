import { CourseClassLiveStateRow } from "../../entities/CourseClassLiveState/CourseClassLiveState.entity.types";
import { SetCourseClassLiveStatePayload } from "../../generated/graphql.types";
import {
	CourseClassLiveStateParent,
	getCourseClassLiveStateParent,
} from "../CourseClassLiveState/CourseClassLiveState.parent";

export type SetCourseClassLiveStatePayloadParent = Pick<Required<SetCourseClassLiveStatePayload>, "__typename"> & {
	courseClassLiveState: CourseClassLiveStateParent;
};

export const getSetCourseClassLiveStatePayloadParent = (payload: {
	courseClassLiveState: CourseClassLiveStateRow;
}): SetCourseClassLiveStatePayloadParent => ({
	__typename: "SetCourseClassLiveStatePayload",
	courseClassLiveState: getCourseClassLiveStateParent(payload.courseClassLiveState),
});
