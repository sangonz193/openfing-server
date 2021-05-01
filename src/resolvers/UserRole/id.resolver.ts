import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["UserRole"]["id"] = (parent) => parent.id.toString();

export default resolver;
