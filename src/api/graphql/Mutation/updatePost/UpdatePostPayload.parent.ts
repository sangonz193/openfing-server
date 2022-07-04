import { PostRow } from "../../../../database/Post/Post.entity.types"
import { getPostParent, PostParent } from "../../Post/Post.parent"
import { UpdatePostPayload } from "../../schemas.types"

export type UpdatePostPayloadParent = Pick<Required<UpdatePostPayload>, "__typename"> & {
	post: PostParent
}

export const getUpdatePostPayloadParent = (payload: { post: PostRow }): UpdatePostPayloadParent => ({
	__typename: "UpdatePostPayload",
	post: getPostParent(payload.post),
})
