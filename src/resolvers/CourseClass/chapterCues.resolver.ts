import { Resolvers } from "../../generated/graphql.types";
import { getCourseClassChapterCueParent } from "../CourseClassChapterCue/CourseClassChapterCue.parent";

const resolver: Resolvers["CourseClass"]["chapterCues"] = async (parent, _, context) => {
	return (
		await context.repositories.courseClassChapterCue.findAll({
			courseClassId: parent.id,
		})
	).map((courseClassChapterCue) => getCourseClassChapterCueParent(courseClassChapterCue));
};

export default resolver;
