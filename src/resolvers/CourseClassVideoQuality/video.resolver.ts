import { Resolvers } from "../../generated/graphql.types";
import { getCourseClassVideoParent } from "../CourseClassVideo/CourseClassVideo.parent";

const resolver: Resolvers["CourseClassVideoQuality"]["video"] = async (parent, {}, { dataLoaders, includeHidden }) => {
	const video =
		parent.courseClassVideoId !== null &&
		(await dataLoaders.courseClassVideo.load({ id: parent.courseClassVideoId, includeHidden }));

	return video ? getCourseClassVideoParent(video) : null;
};

export default resolver;
