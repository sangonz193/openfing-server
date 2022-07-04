import { withAuthenticatedUser } from "../../../middlewares/withAuthenticatedUser"
import { Resolvers } from "../../../schemas.types"
import { createCourseClassList } from "../createCourseClassList"

const resolver: Resolvers["Mutation"]["createCourseClassList_v2"] = withAuthenticatedUser((_, args, context) =>
	createCourseClassList(args.input, context)
)

export default resolver
