import { updatedByResolver } from "../_utils/updatedByResolver"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseEdition"]["updatedBy"] = updatedByResolver

export default resolver
