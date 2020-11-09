import { Resolvers } from "../../generated/graphql.types";
import { getCourseEditionParent } from "../CourseEdition/CourseEdition.parent";

const resolver: Resolvers["CourseClassList"]["courseEdition"] = async (parent, _, { dataLoaders, includeHidden }) => {
	if (typeof parent.courseEditionId !== "number") return null;

	const courseEdition = await dataLoaders.courseEdition.load({
		id: parent.courseEditionId,
		includeHidden,
	});

	return courseEdition && getCourseEditionParent(courseEdition);
};

export default resolver;
