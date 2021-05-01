import { Resolvers } from "../../schemas.types";
import { getUserRoleParent } from "../../UserRole/UserRole.parent";

const resolver: Resolvers["Query"]["userRoles"] = async (_, __, { repositories }) =>
	(await repositories.userRole.findAll({})).map(getUserRoleParent);

export default resolver;
