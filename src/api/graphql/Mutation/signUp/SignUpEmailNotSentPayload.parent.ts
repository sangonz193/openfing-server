import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { SignUpEmailNotSentPayload } from "../../schemas.types"

export type SignUpEmailNotSentPayloadParent = Required<SignUpEmailNotSentPayload>

export const getSignUpEmailNotSentPayloadParent = (
	options: SafeOmit<SignUpEmailNotSentPayloadParent, "__typename">
): SignUpEmailNotSentPayloadParent => ({
	__typename: "SignUpEmailNotSentPayload",
	...options,
})
