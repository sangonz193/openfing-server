import { Resolvers } from "../../generated/graphql.types";
import { deletedByResolver } from "../_utils/deletedByResolver";

const resolver: Resolvers["CourseEdition"]["deletedBy"] = deletedByResolver;

export default resolver;
