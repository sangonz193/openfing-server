import { getNotFoundError } from "../_utils/getNotFoundError";
import { Resolvers } from "../../generated/graphql.types";
import { getCourseClassListParent } from "../CourseClassList/CourseClassList.parent";

const resolver: Resolvers["Query"]["courseClassListByCode"] = async (_, args, context) => {
	context.includeHidden = true;

	const { dataLoaders } = context;
	const courseClassList = await dataLoaders.courseClassList.load({
		code: args.code,
		includeHidden: true,
	});

	if (courseClassList) return getCourseClassListParent(courseClassList);

	return getNotFoundError();
};

export default resolver;
