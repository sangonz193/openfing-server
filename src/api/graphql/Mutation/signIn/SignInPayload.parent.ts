import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { SignInPayload } from "../../schemas.types"

export type SignInPayloadParent = Required<SignInPayload>

export const getSignInPayloadParent = (
	options: SafeOmit<Required<SignInPayload>, "__typename">
): SignInPayloadParent => ({
	__typename: "SignInPayload",
	...options,
})
