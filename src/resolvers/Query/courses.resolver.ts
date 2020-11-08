import { Resolvers } from "../../generated/graphql.types";
import { getCourseParent } from "../Course/Course.parent";

const resolver: Resolvers["Query"]["courses"] = async (_, __, context) => {
	const { repositories } = context;

	return (await repositories.course.findAll()).map(getCourseParent);
};

export default resolver;
