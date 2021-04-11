import { getCourseClassListParent } from "../CourseClassList/CourseClassList.parent";
import { getNotFoundErrorParent } from "../NotFoundError/NotFoundError.parent";
import { Resolvers } from "../schemas.types";

const resolver: Resolvers["Query"]["courseClassListByCode"] = async (_, args, context) => {
	context.includeHidden = true;

	const { dataLoaders } = context;
	const courseClassList = await dataLoaders.courseClassList.load({
		code: args.code,
		includeHidden: true,
	});

	if (courseClassList) {
		return getCourseClassListParent(courseClassList);
	}

	return getNotFoundErrorParent();
};

export default resolver;
