import { withUserFromSecret } from "../../middlewares/withUserFromSecret"
import { Resolvers } from "../../schemas.types"
import { createCourse } from "./createCourse"

const resolver: Resolvers["Mutation"]["createCourse"] = withUserFromSecret((_, args, context) =>
	createCourse(args.input, context)
)

export default resolver
