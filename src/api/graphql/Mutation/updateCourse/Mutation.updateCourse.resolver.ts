import { withAuthenticatedUser } from "../../middlewares/withAuthenticatedUser"
import { Resolvers } from "../../schemas.types"
import { updateCourse } from "./updateCourse"

const resolver: Resolvers["Mutation"]["updateCourse"] = withAuthenticatedUser(async (_, args, context) =>
	updateCourse(args.ref, args.input, context)
)

export default resolver
