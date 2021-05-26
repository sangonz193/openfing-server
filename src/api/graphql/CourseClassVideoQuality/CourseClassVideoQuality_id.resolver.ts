import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClassVideoQuality"]["id"] = (parent) => parent.id.toString()

export default resolver
