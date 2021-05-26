import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseEdition"]["id"] = (parent) => parent.id.toString()

export default resolver
