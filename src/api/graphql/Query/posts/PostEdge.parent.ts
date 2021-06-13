import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { PostParent } from "../../Post/Post.parent"
import { PostEdge } from "../../schemas.types"

export type PostEdgeParent = SafeOmit<PostEdge, "node"> & {
	node: PostParent
}

export type PostEdgeData = Required<Pick<PostEdgeParent, "cursor" | "node">>

export const getPostEdgeParent = (pageInfo: PostEdgeData): PostEdgeParent => ({
	__typename: "PostEdge",
	...pageInfo,
})
