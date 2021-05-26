import { updatedByResolver } from "../_utils/updatedByResolver"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClass"]["updatedBy"] = updatedByResolver

export default resolver
