import { Resolvers } from "../../generated/graphql.types";
import { getCourseClassVideoQualityParent } from "../CourseClassVideoQuality/CourseClassVideoQuality.parent";

const resolver: Resolvers["CourseClassVideoFormat"]["quality"] = async (parent, {}, { dataLoaders }) => {
	const quality =
		parent.courseClassVideoQualityId !== null &&
		(await dataLoaders.courseClassVideoQuality.load({ id: parent.courseClassVideoQualityId }));

	return quality ? getCourseClassVideoQualityParent(quality) : null;
};

export default resolver;
