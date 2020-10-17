import { CourseClassListRow } from "../../entities/CourseClassList/CourseClassList.entity.types";
import { CreateCourseClassListPayload } from "../../generated/graphql.types";
import { CourseClassListParent, getCourseClassListParent } from "../CourseClassList/CourseClassList.parent";

export type CreateCourseClassListPayloadParent = Pick<Required<CreateCourseClassListPayload>, "__typename"> & {
	courseClassList: CourseClassListParent;
};

export const getCreateCourseClassListPayloadParent = (createCoursePayload: {
	courseClassList: CourseClassListRow;
}): CreateCourseClassListPayloadParent => ({
	__typename: "CreateCourseClassListPayload",
	courseClassList: getCourseClassListParent(createCoursePayload.courseClassList),
});
