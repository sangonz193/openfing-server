import { Resolvers } from "../../generated/graphql.types";
import { getNotFoundError } from "../_utils/getNotFoundError";
import { getCourseClassParent } from "../CourseClass/CourseClass.parent";

const resolver: Resolvers["Query"]["courseClassById"] = async (_, args, { dataLoaders }) => {
	const courseClass = await dataLoaders.courseClass.load({ id: args.id, includeHidden: true });

	return courseClass ? getCourseClassParent(courseClass) : getNotFoundError();
};

export default resolver;
