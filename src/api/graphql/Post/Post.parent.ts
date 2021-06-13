import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { PostRow } from "../../../database/Post/Post.entity.types"
import { Post } from "../schemas.types"

export type PostParent = Required<
	SafeOmit<
		PostRow,
		| "id"
		| "title"
		| "content"
		| "content_html"
		| "published_at"
		| "short_content"
		| "created_at"
		| "updated_at"
		| "deleted_at"
	>
> &
	Pick<
		Required<Post>,
		| "__typename"
		| "id"
		| "title"
		| "content"
		| "htmlContent"
		| "shortContent"
		| "createdAt"
		| "updatedAt"
		| "deletedAt"
	>

export const getPostParent = (postRow: PostRow): PostParent => ({
	__typename: "Post",
	...postRow,
	id: postRow.id.toString(),
	title: postRow.title || "", // TODO: fix
	content: postRow.content || "", // TODO: fix
	htmlContent: postRow.content_html ?? "", // TODO: fix
	shortContent: postRow.short_content ?? "", // TODO: fix
	createdAt: postRow.created_at?.toISOString() || null,
	updatedAt: postRow.updated_at?.toISOString() || null,
	deletedAt: postRow.deleted_at?.toISOString() || null,
})
