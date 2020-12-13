import { CourseClassListRow } from "../../entities/CourseClassList/CourseClassList.entity.types";
import { UpdateCourseClassListPayload } from "../../generated/graphql.types";
import { CourseClassListParent, getCourseClassListParent } from "../CourseClassList/CourseClassList.parent";

export type UpdateCourseClassListPayloadParent = Pick<Required<UpdateCourseClassListPayload>, "__typename"> & {
	courseClassList: CourseClassListParent;
};

export const getUpdateCourseClassListPayload = (updateCourseClassListPayload: {
	courseClassList: CourseClassListRow;
}): UpdateCourseClassListPayloadParent => ({
	__typename: "UpdateCourseClassListPayload",
	courseClassList: getCourseClassListParent(updateCourseClassListPayload.courseClassList),
});
