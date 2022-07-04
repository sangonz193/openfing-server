import { deletedByResolver } from "../_utils/deletedByResolver"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["Post"]["deletedBy"] = deletedByResolver

export default resolver
