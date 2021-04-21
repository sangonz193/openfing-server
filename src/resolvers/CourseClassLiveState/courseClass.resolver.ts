import { Resolvers } from "../../generated/graphql.types";
import { getCourseClassParent } from "../CourseClass/CourseClass.parent";

const resolver: Resolvers["CourseClassLiveState"]["courseClass"] = async (parent, _, context) => {
	const courseClass = await context.dataLoaders.courseClass.load({ id: parent.course_class_id, includeHidden: true });
	return courseClass && getCourseClassParent(courseClass);
};

export default resolver;
