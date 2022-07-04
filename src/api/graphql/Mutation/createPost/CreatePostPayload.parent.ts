import { PostRow } from "../../../../database/Post/Post.entity.types"
import { getPostParent, PostParent } from "../../Post/Post.parent"
import { CreatePostPayload } from "../../schemas.types"

export type CreatePostPayloadParent = Pick<Required<CreatePostPayload>, "__typename"> & {
	post: PostParent
}

export const getCreatePostPayloadParent = (payload: { post: PostRow }): CreatePostPayloadParent => ({
	__typename: "CreatePostPayload",
	post: getPostParent(payload.post),
})
