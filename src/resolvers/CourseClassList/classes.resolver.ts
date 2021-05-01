import { Resolvers } from "../../generated/graphql.types";
import { getCourseClassParent } from "../CourseClass/CourseClass.parent";

const resolver: Resolvers["CourseClassList"]["classes"] = async (parent, _, { repositories, includeHidden }) => {
	return (
		await repositories.courseClass.findAll({
			courseClassListId: parent.id,
			includeHidden,
		})
	).map((courseClass) => getCourseClassParent(courseClass));
};

export default resolver;
