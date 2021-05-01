import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["CourseEdition"]["id"] = (parent) => parent.id.toString();

export default resolver;
