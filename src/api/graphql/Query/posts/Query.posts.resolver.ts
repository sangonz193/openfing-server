import { getPostParent } from "../../Post/Post.parent"
import { Resolvers } from "../../schemas.types"

const resolver: Resolvers["Query"]["posts"] = async (_, args, context) => {
	const allAndCount = await context.repositories.post.findAllAndCount({
		limit: args.first ?? undefined,
		order: args.orderBy?.direction,
		publishedAfter: args.after ? new Date(args.after) : undefined,
	})

	return {
		__typename: "PostConnection",
		totalCount: allAndCount[1],
		pageInfo: {
			__typename: "ConnectionPageInfo",
			hasNextPage: true,
		},
		edges: allAndCount[0].map((post) => ({ node: getPostParent(post), cursor: post.id, __typename: "PostEdge" })),
	}
}

export default resolver
