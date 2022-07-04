import * as yup from "yup"

import { RequestContext } from "../../../../context/RequestContext"
import { GenericErrorParent, getGenericErrorParent } from "../../GenericError/GenericError.parent"
import { getNotFoundErrorParent, NotFoundErrorParent } from "../../NotFoundError/NotFoundError.parent"
import { MutationUpdatePostArgs, UpdatePostInput } from "../../schemas.types"
import { getUpdatePostPayloadParent, UpdatePostPayloadParent } from "./UpdatePostPayload.parent"

export async function updatePost(
	id: string,
	input: UpdatePostInput,
	context: RequestContext & Required<Pick<RequestContext, "user">>
): Promise<GenericErrorParent | NotFoundErrorParent | UpdatePostPayloadParent> {
	const { user, dataLoaders, repositories } = context

	const validatedDataPromise = yup
		.object<yup.SchemaOf<MutationUpdatePostArgs["input"]>["fields"]>({
			title: yup.string().trim().max(200).required(),
			mdContent: yup.string().trim().max(10000).required(),
			publishedAt: yup.date().notRequired().nullable(),
		})
		.required()
		.validate(input)

	let validatedData: typeof validatedDataPromise extends Promise<infer T> ? T : unknown
	try {
		validatedData = await validatedDataPromise
	} catch (e: unknown) {
		console.log(e)
		return getGenericErrorParent()
	}

	const post = await dataLoaders.post.find.load({ id: id })

	if (!post) {
		return getNotFoundErrorParent()
	}

	const updatedPost = await repositories.post.update(post.id, {
		md_content: validatedData.mdContent,
		title: validatedData.title,
		published_at: validatedData.publishedAt,
		updated_by_id: user.sub,
	})
	// TODO: necessary?
	dataLoaders.post.find.clearAll()

	return getUpdatePostPayloadParent({
		post: updatedPost,
	})
}
