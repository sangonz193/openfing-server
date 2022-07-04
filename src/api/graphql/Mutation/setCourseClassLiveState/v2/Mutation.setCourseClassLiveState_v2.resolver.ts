import { withAuthenticatedUser } from "../../../middlewares/withAuthenticatedUser"
import { Resolvers } from "../../../schemas.types"
import { setCourseClassLiveState } from "../setCourseClassLiveState"

const resolver: Resolvers["Mutation"]["setCourseClassLiveState_v2"] = withAuthenticatedUser((_, args, context) =>
	setCourseClassLiveState(args.input, context)
)

export default resolver
