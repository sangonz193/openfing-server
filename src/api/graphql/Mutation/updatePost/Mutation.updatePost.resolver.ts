import { withAuthenticatedUser } from "../../middlewares/withAuthenticatedUser"
import { Resolvers } from "../../schemas.types"
import { updatePost } from "./updatePost"

const resolver: Resolvers["Mutation"]["updatePost"] = withAuthenticatedUser(async (_, args, context) =>
	updatePost(args.id, args.input, context)
)

export default resolver
