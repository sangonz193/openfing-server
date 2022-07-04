import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { TypedRepository } from "../_utils/TypedRepository"
import { PostEntitySchema, PostRow } from "../Post/Post.entity.types"

export type PostAccessOptions = {
	includeDrafts?: boolean
}

export type PostFindAllOptions = PostAccessOptions

export type PostFindOneOptions = PostAccessOptions & {
	id: string
}

export type SavePostData = PostRow

export type CreatePostData = SafeOmit<
	PostRow,
	"id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id"
> &
	Partial<Pick<PostRow, "id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id">>

export type PostRepository = {
	_typedRepository: TypedRepository<PostEntitySchema>

	findAll: (options: PostFindAllOptions) => Promise<PostRow[]>
	findBatch: (options: readonly PostFindOneOptions[]) => Promise<Array<PostRow | null>>

	is: (post: PostRow, findOptions: PostFindOneOptions) => boolean

	create: (data: CreatePostData) => SavePostData
	insert: (data: SavePostData) => Promise<PostRow>
	createAndInsert: (data: CreatePostData) => Promise<PostRow>

	update: (id: PostRow["id"], newValues: Partial<SafeOmit<PostRow, "id">>) => Promise<PostRow>
	delete: (id: PostRow["id"], data: Pick<Required<PostRow>, "deleted_by_id">) => Promise<PostRow>
}
