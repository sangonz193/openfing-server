import { withAuthenticatedUser } from "../../../middlewares/withAuthenticatedUser"
import { Resolvers } from "../../../schemas.types"
import { createCourseClass } from "../createCourseClass"

const resolver: Resolvers["Mutation"]["createCourseClass_v2"] = withAuthenticatedUser((_, args, context) =>
	createCourseClass(args.input, context)
)

export default resolver
