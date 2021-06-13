import { deletedByResolver } from "../_utils/deletedByResolver"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClassList"]["deletedBy"] = deletedByResolver

export default resolver
