import { Resolvers } from "../../generated/graphql.types";
import { getNotFoundError } from "../_utils/getNotFoundError";
import { getCourseClassListParent } from "../CourseClassList/CourseClassList.parent";

const resolver: Resolvers["Query"]["courseClassListById"] = async (_, args, context) => {
	context.includeHidden = true;

	const { id } = args;
	const { dataLoaders } = context;

	const courseClassList = await dataLoaders.courseClassList.load({
		id,
		includeHidden: true,
	});

	if (courseClassList) return getCourseClassListParent(courseClassList);

	return getNotFoundError();
};

export default resolver;
