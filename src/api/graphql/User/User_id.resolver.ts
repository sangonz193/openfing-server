import { Resolvers } from "../schemas.types";

const resolver: Resolvers["User"]["id"] = (parent) => parent.id.toString();

export default resolver;
