import { withAuthenticatedUser } from "../../../middlewares/withAuthenticatedUser"
import { Resolvers } from "../../../schemas.types"
import { createCourse } from "../createCourse"

const resolver: Resolvers["Mutation"]["createCourse_v2"] = withAuthenticatedUser((_, args, context) =>
	createCourse(args.input, context)
)

export default resolver
