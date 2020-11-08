import { Resolvers } from "../../generated/graphql.types";
import { getUserRoleParent } from "../UserRole/UserRole.parent";

const resolver: Resolvers["User"]["roles"] = async (parent, _, { repositories }) => {
	return (await repositories.userRole.findAll({ userId: parent.id })).map(getUserRoleParent);
};

export default resolver;
