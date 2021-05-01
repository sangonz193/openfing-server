import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["Course"]["id"] = (parent) => parent.id.toString();

export default resolver;
