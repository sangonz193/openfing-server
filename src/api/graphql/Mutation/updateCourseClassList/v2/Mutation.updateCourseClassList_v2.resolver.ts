import { withAuthenticatedUser } from "../../../middlewares/withAuthenticatedUser"
import { Resolvers } from "../../../schemas.types"
import { updateCourseClassList } from "../updateCourseClassList"

const resolver: Resolvers["Mutation"]["updateCourseClassList_v2"] = withAuthenticatedUser(async (_, args, context) =>
	updateCourseClassList(args.ref, args.input, context)
)

export default resolver
