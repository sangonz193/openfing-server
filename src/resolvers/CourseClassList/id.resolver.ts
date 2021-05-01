import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["CourseClassList"]["id"] = (parent) => parent.id.toString();

export default resolver;
