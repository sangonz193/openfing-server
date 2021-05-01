import { Resolvers } from "../../generated/graphql.types";
import { getNotFoundError } from "../_utils/getNotFoundError";
import { getCourseEditionParent } from "../CourseEdition/CourseEdition.parent";

const resolver: Resolvers["Query"]["courseEditionById"] = async (_, args, { dataLoaders }) => {
	const { id } = args;

	const courseEdition = await dataLoaders.courseEdition.load({ id });

	return courseEdition ? getCourseEditionParent(courseEdition) : getNotFoundError();
};

export default resolver;
