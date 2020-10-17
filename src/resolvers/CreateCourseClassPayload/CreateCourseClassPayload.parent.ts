import { CourseClassRow } from "../../entities/CourseClass/CourseClass.entity.types";
import { CreateCourseClassPayload } from "../../generated/graphql.types";
import { CourseClassParent, getCourseClassParent } from "../CourseClass/CourseClass.parent";

export type CreateCourseClassPayloadParent = Pick<Required<CreateCourseClassPayload>, "__typename"> & {
	courseClass: CourseClassParent;
};

export const getCreateCourseClassPayloadParent = (createCoursePayload: {
	courseClass: CourseClassRow;
}): CreateCourseClassPayloadParent => ({
	__typename: "CreateCourseClassPayload",
	courseClass: getCourseClassParent(createCoursePayload.courseClass),
});
