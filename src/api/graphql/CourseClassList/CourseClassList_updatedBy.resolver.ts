import { updatedByResolver } from "../_utils/updatedByResolver"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClassList"]["updatedBy"] = updatedByResolver

export default resolver
