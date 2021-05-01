import { Resolvers } from "../../generated/graphql.types";
import { deletedByResolver } from "../_utils/deletedByResolver";

const resolver: Resolvers["Faq"]["deletedBy"] = deletedByResolver;

export default resolver;
