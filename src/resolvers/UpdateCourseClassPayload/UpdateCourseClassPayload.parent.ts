import { CourseClassRow } from "../../entities/CourseClass/CourseClass.entity.types";
import { UpdateCourseClassPayload } from "../../generated/graphql.types";
import { CourseClassParent, getCourseClassParent } from "../CourseClass/CourseClass.parent";

export type UpdateCourseClassPayloadParent = Pick<Required<UpdateCourseClassPayload>, "__typename"> & {
	courseClass: CourseClassParent;
};

export const getUpdateCourseClassPayload = (updateCourseClassPayload: {
	courseClass: CourseClassRow;
}): UpdateCourseClassPayloadParent => ({
	__typename: "UpdateCourseClassPayload",
	courseClass: getCourseClassParent(updateCourseClassPayload.courseClass),
});
