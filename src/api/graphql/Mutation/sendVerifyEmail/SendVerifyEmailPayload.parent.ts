import { SendVerifyEmailPayload } from "../../schemas.types"

export type SendVerifyEmailPayloadParent = Required<SendVerifyEmailPayload>

export const getSendVerifyEmailPayloadParent = (): SendVerifyEmailPayloadParent => ({
	__typename: "SendVerifyEmailPayload",
	_: null,
})
