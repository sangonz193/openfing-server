import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["CourseClassVideoFormat"]["id"] = (parent) => parent.id.toString();

export default resolver;
