import { deletedByResolver } from "../_utils/deletedByResolver"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClassVideoFormat"]["deletedBy"] = deletedByResolver

export default resolver
