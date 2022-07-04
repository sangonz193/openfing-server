import { RequestContext } from "../../../../context/RequestContext"
import { GenericErrorParent } from "../../GenericError/GenericError.parent"
import { getNotFoundErrorParent, NotFoundErrorParent } from "../../NotFoundError/NotFoundError.parent"
import { DeletePostPayloadParent, getDeletePostPayloadParent } from "./DeletePostPayload.parent"

export async function deletePost(
	id: string,
	context: RequestContext & Required<Pick<RequestContext, "user">>
): Promise<GenericErrorParent | NotFoundErrorParent | DeletePostPayloadParent> {
	const { user, dataLoaders, repositories } = context
	const post = await dataLoaders.post.find.load({ id: id })

	if (!post) {
		return getNotFoundErrorParent()
	}

	await repositories.post.delete(post.id, {
		deleted_by_id: user.sub,
	})
	// TODO: necessary?
	dataLoaders.post.find.clearAll()

	return getDeletePostPayloadParent({
		deleted: true,
	})
}
