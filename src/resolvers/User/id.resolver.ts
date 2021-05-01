import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["User"]["id"] = (parent) => parent.id.toString();

export default resolver;
