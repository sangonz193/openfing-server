import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { RefreshTokenPayload } from "../../schemas.types"

export type RefreshTokenPayloadParent = Required<RefreshTokenPayload>

export const getRefreshTokenPayloadParent = (
	options: SafeOmit<Required<RefreshTokenPayload>, "__typename">
): RefreshTokenPayloadParent => ({
	__typename: "RefreshTokenPayload",
	...options,
})
