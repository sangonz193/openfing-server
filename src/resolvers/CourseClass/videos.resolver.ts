import { Resolvers } from "../../generated/graphql.types";
import { getCourseClassVideoParent } from "../CourseClassVideo/CourseClassVideo.parent";

const resolver: Resolvers["CourseClass"]["videos"] = async (parent, _, context) => {
	return (
		await context.repositories.courseClassVideo.findAll({
			courseClassId: parent.id,
		})
	).map((courseClassVideo) => getCourseClassVideoParent(courseClassVideo));
};

export default resolver;
