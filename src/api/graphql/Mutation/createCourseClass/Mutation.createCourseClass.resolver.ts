import { withUserFromSecret } from "../../middlewares/withUserFromSecret"
import { Resolvers } from "../../schemas.types"
import { createCourseClass } from "./createCourseClass"

const resolver: Resolvers["Mutation"]["createCourseClass"] = withUserFromSecret(async (_, args, context) =>
	createCourseClass(args.input, context)
)

export default resolver
