import { Resolvers } from "../../generated/graphql.types";
import { getCourseClassListParent } from "../CourseClassList/CourseClassList.parent";

const resolver: Resolvers["CourseClass"]["courseClassList"] = async (parent, _, context) => {
	const courseClassList =
		parent.course_class_list_id !== null
			? await context.dataLoaders.courseClassList.load({
					id: parent.course_class_list_id,
					includeHidden: true,
			  })
			: null;

	return courseClassList && getCourseClassListParent(courseClassList);
};

export default resolver;
