import { deletedByResolver } from "../_utils/deletedByResolver"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClassVideoQuality"]["deletedBy"] = deletedByResolver

export default resolver
