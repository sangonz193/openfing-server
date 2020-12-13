import { Resolvers } from "../../generated/graphql.types";
import { deletedByResolver } from "../_utils/deletedByResolver";

const resolver: Resolvers["CourseClassVideo"]["deletedBy"] = deletedByResolver;

export default resolver;
