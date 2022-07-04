import { withUserFromSecret } from "../../middlewares/withUserFromSecret"
import { Resolvers } from "../../schemas.types"
import { updateCourseClass } from "./updateCourseClass"

const resolver: Resolvers["Mutation"]["updateCourseClass"] = withUserFromSecret(async (_, args, context) =>
	updateCourseClass(args.ref, args.input, context)
)

export default resolver
