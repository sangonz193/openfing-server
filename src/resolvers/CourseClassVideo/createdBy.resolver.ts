import { Resolvers } from "../../generated/graphql.types";
import { createdByResolver } from "../_utils/createdByResolver";

const resolver: Resolvers["CourseClassVideo"]["createdBy"] = createdByResolver;

export default resolver;
