import { getUserFromContext } from "../../../_utils/getUserFromContext"
import { getPostParent } from "../../Post/Post.parent"
import { Resolvers } from "../../schemas.types"

const resolver: Resolvers["Query"]["posts"] = async (_, __, context) => {
	const { repositories } = context
	const user = await getUserFromContext(context)

	return (await repositories.post.findAll({ includeDrafts: !!user })).map(getPostParent)
}

export default resolver
