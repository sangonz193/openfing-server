import { Resolvers } from "../../generated/graphql.types";
import { updatedByResolver } from "../_utils/updatedByResolver";

const resolver: Resolvers["CourseClassVideoQuality"]["updatedBy"] = updatedByResolver;

export default resolver;
