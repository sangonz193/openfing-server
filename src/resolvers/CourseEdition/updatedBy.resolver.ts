import { Resolvers } from "../../generated/graphql.types";
import { updatedByResolver } from "../_utils/updatedByResolver";

const resolver: Resolvers["CourseEdition"]["updatedBy"] = updatedByResolver;

export default resolver;
