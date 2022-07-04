import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClassVideo"]["id"] = (parent) => parent.id.toString()

export default resolver
