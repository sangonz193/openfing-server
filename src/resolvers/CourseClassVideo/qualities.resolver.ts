import { Resolvers } from "../../generated/graphql.types";
import { getCourseClassVideoQualityParent } from "../CourseClassVideoQuality/CourseClassVideoQuality.parent";

const resolver: Resolvers["CourseClassVideo"]["qualities"] = async (parent, _, { repositories }) => {
	return (await repositories.courseClassVideoQuality.findAll({ courseClassVideoId: parent.id })).map((quality) =>
		getCourseClassVideoQualityParent(quality)
	);
};

export default resolver;
