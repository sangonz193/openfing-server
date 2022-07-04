import { withAuthenticatedUser } from "../../middlewares/withAuthenticatedUser"
import { Resolvers } from "../../schemas.types"
import { deletePost } from "./deletePost"

const resolver: Resolvers["Mutation"]["deletePost"] = withAuthenticatedUser(async (_, args, context) =>
	deletePost(args.id, context)
)

export default resolver
