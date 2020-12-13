import { Resolvers } from "../../generated/graphql.types";
import { getCourseEditionParent } from "../CourseEdition/CourseEdition.parent";

const resolver: Resolvers["CourseClassList"]["courseEdition"] = async (parent, _, { dataLoaders, includeHidden }) => {
	if (typeof parent.course_edition_id !== "number") return null;

	const courseEdition = await dataLoaders.courseEdition.load({
		id: parent.course_edition_id,
		includeHidden,
	});

	return courseEdition && getCourseEditionParent(courseEdition);
};

export default resolver;
