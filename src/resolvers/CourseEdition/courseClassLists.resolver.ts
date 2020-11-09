import { Resolvers } from "../../generated/graphql.types";
import { getCourseClassListParent } from "../CourseClassList/CourseClassList.parent";

const resolver: Resolvers["CourseEdition"]["courseClassLists"] = async (parent, _, { repositories, includeHidden }) => {
	return (
		await repositories.courseClassList.findAll({
			courseEditionId: parent.id,
			includeHidden,
		})
	).map((courseClassList) => getCourseClassListParent(courseClassList));
};

export default resolver;
