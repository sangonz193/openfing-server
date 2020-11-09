import { Resolvers } from "../../generated/graphql.types";
import { getCourseParent } from "../Course/Course.parent";

const resolver: Resolvers["CourseEdition"]["course"] = async (parent, _, { dataLoaders, includeHidden }) => {
	const course = parent.courseId !== null && (await dataLoaders.course.load({ id: parent.courseId, includeHidden }));

	return course ? getCourseParent(course) : null;
};

export default resolver;
