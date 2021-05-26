import { updatedByResolver } from "../_utils/updatedByResolver"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["Course"]["updatedBy"] = updatedByResolver

export default resolver
