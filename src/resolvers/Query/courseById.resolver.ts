import { Resolvers } from "../../generated/graphql.types";
import { getNotFoundError } from "../_utils/getNotFoundError";
import { getCourseParent } from "../Course/Course.parent";

const resolver: Resolvers["Query"]["courseById"] = async (_, args, context) => {
	const { dataLoaders } = context;
	const id = Number(args.id);

	if (!isNaN(id)) {
		const course = await dataLoaders.course.load({ id, includeHidden: true });

		if (course) return getCourseParent(course);
	}

	return getNotFoundError();
};

export default resolver;
