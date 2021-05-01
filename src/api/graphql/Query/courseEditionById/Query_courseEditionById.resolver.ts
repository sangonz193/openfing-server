import { getCourseEditionParent } from "../../CourseEdition/CourseEdition.parent";
import { Resolvers } from "../../schemas.types";

const resolver: Resolvers["Query"]["courseEditionById"] = async (_, args, { dataLoaders }) => {
	const { id } = args;

	const courseEdition = await dataLoaders.courseEdition.load({ id });

	return courseEdition ? getCourseEditionParent(courseEdition) : getNotFoundError();
};

export default resolver;
function getNotFoundError(): any {
	throw new Error("Function not implemented.");
}
