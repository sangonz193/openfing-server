import { Resolvers } from "../../generated/graphql.types";
import { deletedByResolver } from "../_utils/deletedByResolver";

const resolver: Resolvers["CourseClassVideoQuality"]["deletedBy"] = deletedByResolver;

export default resolver;
