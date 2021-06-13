import { updatedByResolver } from "../_utils/updatedByResolver"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["Faq"]["updatedBy"] = updatedByResolver

export default resolver
