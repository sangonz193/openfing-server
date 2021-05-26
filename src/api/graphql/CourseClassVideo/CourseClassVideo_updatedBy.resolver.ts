import { updatedByResolver } from "../_utils/updatedByResolver"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClassVideo"]["updatedBy"] = updatedByResolver

export default resolver
