import { withUserFromSecret } from "../../middlewares/withUserFromSecret"
import { Resolvers } from "../../schemas.types"
import { createCourseClassList } from "./createCourseClassList"

const resolver: Resolvers["Mutation"]["createCourseClassList"] = withUserFromSecret(async (_, args, context) =>
	createCourseClassList(args.input, context)
)

export default resolver
