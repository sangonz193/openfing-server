import { Resolvers } from "../../generated/graphql.types";
import { getCourseClassLiveStateParent } from "../CourseClassLiveState/CourseClassLiveState.parent";

const resolver: Resolvers["CourseClass"]["liveState"] = async (parent, _, context) => {
	const liveState = await context.dataLoaders.courseClassLiveStateByCourseClassId.load(parent.id);

	return liveState && getCourseClassLiveStateParent(liveState);
};

export default resolver;
