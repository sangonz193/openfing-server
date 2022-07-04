import { withAuthenticatedUser } from "../../middlewares/withAuthenticatedUser"
import { Resolvers } from "../../schemas.types"
import { createPost } from "./createPost"

const resolver: Resolvers["Mutation"]["createPost"] = withAuthenticatedUser(async (_, args, context) =>
	createPost(args.input, context)
)

export default resolver
