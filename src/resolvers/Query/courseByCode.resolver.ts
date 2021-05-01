import { Resolvers } from "../../generated/graphql.types";
import { getNotFoundError } from "../_utils/getNotFoundError";
import { getCourseParent } from "../Course/Course.parent";

const resolver: Resolvers["Query"]["courseByCode"] = async (_, args, context) => {
	const { dataLoaders } = context;
	const course = await dataLoaders.course.load({ code: args.code, includeHidden: true });

	return course ? getCourseParent(course) : getNotFoundError();
};

export default resolver;
