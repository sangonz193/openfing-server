import { Resolvers } from "../../generated/graphql.types";
import { getNotFoundError } from "../_utils/getNotFoundError";
import { getCourseClassListParent } from "../CourseClassList/CourseClassList.parent";

const resolver: Resolvers["Query"]["courseClassListById"] = async (_, args, context) => {
	context.includeHidden = true;

	const { dataLoaders } = context;
	const parsedId = Number(args.id);

	if (!isNaN(parsedId)) {
		const courseClassList = await dataLoaders.courseClassList.load({
			id: parsedId,
			includeHidden: true,
		});

		if (courseClassList) return getCourseClassListParent(courseClassList);
	}

	return getNotFoundError();
};

export default resolver;
