import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["CourseClass"]["id"] = (parent) => parent.id.toString();

export default resolver;
