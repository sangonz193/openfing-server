import { Resolvers } from "../schemas.types";

const resolver: Resolvers["Course"]["id"] = (parent) => parent.id.toString();

export default resolver;
