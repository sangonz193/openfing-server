import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { TypedRepository } from "../_utils/TypedRepository"
import { PostEntitySchema, PostRow } from "./Post.entity.types"

export type PostFindOneOptions = Pick<PostRow, "id">

export type PostFindAllOptions = {
	publishedAfter?: Date
	limit?: number
	order?: "ASC" | "DESC"
}

export type InsertPostData = PostRow

export type CreatePostData = SafeOmit<
	PostRow,
	"id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id"
> &
	Partial<Pick<PostRow, "id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id">>

export type PostRepository = {
	_typedRepository: TypedRepository<PostEntitySchema>

	findOne: (options: PostFindOneOptions) => Promise<PostRow | null>
	findBatch: (options: readonly PostFindOneOptions[]) => Promise<Array<PostRow | null>>
	findAllAndCount: (options: PostFindAllOptions) => Promise<[PostRow[], number]>

	is: (courseClass: PostRow, findOptions: PostFindOneOptions) => boolean

	create: (data: CreatePostData) => InsertPostData
	insert: (data: InsertPostData) => Promise<PostRow>
	createAndInsert: (data: CreatePostData) => Promise<PostRow>

	update: (
		id: PostRow["id"],
		newValues: Partial<SafeOmit<PostRow, "id" | "updated_at" | "updated_by_id">> &
			Required<Pick<PostRow, "updated_by_id">>
	) => Promise<PostRow>

	delete: (id: PostRow["id"], data: Pick<Required<PostRow>, "deleted_by_id">) => Promise<PostRow>
}
