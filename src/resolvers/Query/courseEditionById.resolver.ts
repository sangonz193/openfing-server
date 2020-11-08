import { getNotFoundError } from "../_utils/getNotFoundError";
import { Resolvers } from "../../generated/graphql.types";
import { getCourseEditionParent } from "../CourseEdition/CourseEdition.parent";

const resolver: Resolvers["Query"]["courseEditionById"] = async (_, args, { dataLoaders }) => {
	const parsedId = Number(args.id);

	if (!isNaN(parsedId)) {
		const courseEdition = await dataLoaders.courseEdition.load({ id: parsedId });

		if (courseEdition) return getCourseEditionParent(courseEdition);
	}

	return getNotFoundError();
};

export default resolver;
