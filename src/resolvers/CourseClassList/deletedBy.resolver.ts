import { Resolvers } from "../../generated/graphql.types";
import { deletedByResolver } from "../_utils/deletedByResolver";

const resolver: Resolvers["CourseClassList"]["deletedBy"] = deletedByResolver;

export default resolver;
