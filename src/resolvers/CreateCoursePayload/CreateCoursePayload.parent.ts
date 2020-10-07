import { CourseRow } from "../../entities/Course/Course.entity.types";
import { CreateCoursePayload } from "../../generated/graphql.types";
import { CourseParent, getCourseParent } from "../Course/Course.parent";

export type CreateCoursePayloadParent = Pick<Required<CreateCoursePayload>, "__typename"> & {
	course: CourseParent;
};

export const getCreateCoursePayloadParent = (createCoursePayload: {
	course: CourseRow;
}): CreateCoursePayloadParent => ({
	__typename: "CreateCoursePayload",
	course: getCourseParent(createCoursePayload.course),
});
