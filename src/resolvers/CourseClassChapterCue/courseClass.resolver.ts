import { Resolvers } from "../../generated/graphql.types";
import { getCourseClassParent } from "../CourseClass/CourseClass.parent";

const resolver: Resolvers["CourseClassChapterCue"]["courseClass"] = async (parent, _, { dataLoaders }) => {
	const courseClass = parent.courseClassId && (await dataLoaders.courseClass.load({ id: parent.courseClassId }));

	if (courseClass) return getCourseClassParent(courseClass);

	return null;
};

export default resolver;
