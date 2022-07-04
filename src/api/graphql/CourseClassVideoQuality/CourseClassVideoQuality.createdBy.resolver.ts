import { createdByResolver } from "../_utils/createdByResolver"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClassVideoQuality"]["createdBy"] = createdByResolver

export default resolver
