import { Resolvers } from "../schemas.types";

const resolver: Resolvers["UserRole"]["id"] = (parent) => parent.id.toString();

export default resolver;
