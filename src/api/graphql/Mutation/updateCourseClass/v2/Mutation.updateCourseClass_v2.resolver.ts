import { withAuthenticatedUser } from "../../../middlewares/withAuthenticatedUser"
import { Resolvers } from "../../../schemas.types"
import { updateCourseClass } from "../updateCourseClass"

const resolver: Resolvers["Mutation"]["updateCourseClass_v2"] = withAuthenticatedUser(async (_, args, context) =>
	updateCourseClass(args.ref, args.input, context)
)

export default resolver
