import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClass"]["id"] = (parent) => parent.id.toString()

export default resolver
