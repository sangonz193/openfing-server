import { DeletePostPayload } from "../../schemas.types"

export type DeletePostPayloadParent = Pick<Required<DeletePostPayload>, "__typename" | "deleted">

export const getDeletePostPayloadParent = (payload: { deleted: boolean }): DeletePostPayloadParent => ({
	...payload,
	__typename: "DeletePostPayload",
})
