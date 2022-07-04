import { withUserFromSecret } from "../../middlewares/withUserFromSecret"
import { Resolvers } from "../../schemas.types"
import { updateCourseClassList } from "./updateCourseClassList"

const resolver: Resolvers["Mutation"]["updateCourseClassList"] = withUserFromSecret(async (_, args, context) =>
	updateCourseClassList(args.ref, args.input, context)
)

export default resolver
