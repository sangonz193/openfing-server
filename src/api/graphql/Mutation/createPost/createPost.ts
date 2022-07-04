import * as yup from "yup"

import { RequestContext } from "../../../../context/RequestContext"
import { GenericErrorParent, getGenericErrorParent } from "../../GenericError/GenericError.parent"
import { CreatePostInput, MutationCreatePostArgs } from "../../schemas.types"
import { CreatePostPayloadParent, getCreatePostPayloadParent } from "./CreatePostPayload.parent"

export async function createPost(
	input: CreatePostInput,
	context: RequestContext & Required<Pick<RequestContext, "user">>
): Promise<GenericErrorParent | CreatePostPayloadParent> {
	const { user, dataLoaders, repositories } = context

	const validatedDataPromise = yup
		.object<yup.SchemaOf<MutationCreatePostArgs["input"]>["fields"]>({
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

	const post = await repositories.post.createAndInsert({
		md_content: validatedData.mdContent,
		title: validatedData.title,
		published_at: validatedData.publishedAt || null,
		created_by_id: user.sub,
	})
	// TODO: necessary?
	dataLoaders.post.find.clearAll()

	return getCreatePostPayloadParent({
		post: post,
	})
}
