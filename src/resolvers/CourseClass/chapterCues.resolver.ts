import { Resolvers } from "../../generated/graphql.types";
import { getCourseClassChapterCueParent } from "../CourseClassChapterCue/CourseClassChapterCue.parent";

const resolver: Resolvers["CourseClass"]["chapterCues"] = async (parent, _, context) => {
	return parent.courseClassListId
		? (
				await context.dataLoaders.courseClassChapterCue.findAll({
					courseClassId: parent.id,
				})
		  ).map((courseClassChapterCue) => getCourseClassChapterCueParent(courseClassChapterCue))
		: [];
};

export default resolver;
