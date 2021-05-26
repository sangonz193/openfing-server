import { createdByResolver } from "../_utils/createdByResolver"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["Course"]["createdBy"] = createdByResolver

export default resolver
