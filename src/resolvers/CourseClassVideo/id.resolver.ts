import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["CourseClassVideo"]["id"] = (parent) => parent.id.toString();

export default resolver;
