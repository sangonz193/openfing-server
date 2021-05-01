import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["CourseClassVideoQuality"]["id"] = (parent) => parent.id.toString();

export default resolver;
