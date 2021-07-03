import { ConnectionPageInfo } from "../../schemas.types"

export type ConnectionPageInfoParent = Required<ConnectionPageInfo>

export type ConnectionPageInfoData = Pick<ConnectionPageInfoParent, "endCursor" | "hasNextPage">

export const getConnectionPageInfoParent = (pageInfo: ConnectionPageInfoData): ConnectionPageInfoParent => ({
	__typename: "ConnectionPageInfo",
	...pageInfo,
})
