import { withUserFromSecret } from "../../middlewares/withUserFromSecret"
import { Resolvers } from "../../schemas.types"
import { setCourseClassLiveState } from "./setCourseClassLiveState"

const resolver: Resolvers["Mutation"]["setCourseClassLiveState"] = withUserFromSecret((_, args, context) =>
	setCourseClassLiveState(args.input, context)
)

export default resolver
