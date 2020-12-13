import { Resolvers } from "../../generated/graphql.types";
import { updatedByResolver } from "../_utils/updatedByResolver";

const resolver: Resolvers["CourseClassList"]["updatedBy"] = updatedByResolver;

export default resolver;
