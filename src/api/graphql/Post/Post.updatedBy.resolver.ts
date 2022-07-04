import { updatedByResolver } from "../_utils/updatedByResolver"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["Post"]["updatedBy"] = updatedByResolver

export default resolver
