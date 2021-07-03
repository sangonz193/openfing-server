import { getPostParent } from "../../Post/Post.parent"
import { Resolvers } from "../../schemas.types"
import { getConnectionPageInfoParent } from "./ConnectionPageInfo.parent"
import { getPostConnectionParent } from "./PostConnection.parent"

const resolver: Resolvers["Query"]["posts"] = async (_, args, context) => {
	const allAndCount = await context.repositories.post.findAllAndCount({
		limit: args.first ?? undefined,
		order: args.orderBy?.direction,
		publishedAfter: args.after ? new Date(args.after) : undefined,
	})

	return getPostConnectionParent({
		totalCount: allAndCount[1],
		pageInfo: getConnectionPageInfoParent({
			hasNextPage: true,
			endCursor: allAndCount.length > 0 ? allAndCount[0][allAndCount[0].length - 1].id : null,
		}),
		edges: allAndCount[0].map((post) => ({ node: getPostParent(post), cursor: post.id, __typename: "PostEdge" })),
	})
}

export default resolver
