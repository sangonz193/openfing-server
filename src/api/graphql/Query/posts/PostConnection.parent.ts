import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { PostConnection } from "../../schemas.types"
import { ConnectionPageInfoParent } from "./ConnectionPageInfo.parent"
import { PostEdgeParent } from "./PostEdge.parent"

export type PostConnectionParent = SafeOmit<PostConnection, "edges" | "pageInfo"> & {
	edges: PostEdgeParent[]
	pageInfo: ConnectionPageInfoParent
}

export type PostConnectionData = Required<SafeOmit<PostConnectionParent, "__typename">>

export const getPostConnectionParent = (pageInfo: PostConnectionData): PostConnectionParent => ({
	__typename: "PostConnection",
	...pageInfo,
})
