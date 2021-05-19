import { Resolvers } from "../schemas.types";

const resolver: Resolvers["CourseClassVideoFormat"]["id"] = (parent) => parent.id.toString();

export default resolver;
