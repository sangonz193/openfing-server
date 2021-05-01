import { Resolvers } from "../../generated/graphql.types";
import { updatedByResolver } from "../_utils/updatedByResolver";

const resolver: Resolvers["CourseClass"]["updatedBy"] = updatedByResolver;

export default resolver;
