import { createdByResolver } from "../_utils/createdByResolver"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseEdition"]["createdBy"] = createdByResolver

export default resolver
