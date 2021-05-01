import { Resolvers } from "../../generated/graphql.types";
import { deletedByResolver } from "../_utils/deletedByResolver";

const resolver: Resolvers["Course"]["deletedBy"] = deletedByResolver;

export default resolver;
