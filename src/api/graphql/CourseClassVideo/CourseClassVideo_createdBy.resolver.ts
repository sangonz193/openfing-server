import { createdByResolver } from "../_utils/createdByResolver"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClassVideo"]["createdBy"] = createdByResolver

export default resolver
