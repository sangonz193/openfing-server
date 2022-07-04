import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClassList"]["id"] = (parent) => parent.id.toString()

export default resolver
