import { Resolvers } from "../../generated/graphql.types";
import { getNotFoundError } from "../_utils/getNotFoundError";
import { getCourseClassParent } from "../CourseClass/CourseClass.parent";

const resolver: Resolvers["Query"]["courseClassById"] = async (_, args, { dataLoaders }) => {
	try {
		const parsedId = parseInt(args.id);

		if (!isNaN(parsedId)) {
			const courseClass = await dataLoaders.courseClass.load({ id: parsedId, includeHidden: true });

			return courseClass ? getCourseClassParent(courseClass) : getNotFoundError();
		}
	} catch (e) {}

	return getNotFoundError();
};

export default resolver;
