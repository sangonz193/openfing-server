import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { PostRow } from "../../../database/Post/Post.entity.types"
import { Post } from "../schemas.types"

export type PostParent = Required<
	SafeOmit<PostRow, "id" | "title" | "md_content" | "published_at" | "created_at" | "updated_at" | "deleted_at">
> &
	Pick<
		Required<Post>,
		"__typename" | "id" | "title" | "mdContent" | "publishedAt" | "createdAt" | "updatedAt" | "deletedAt"
	>

export const getPostParent = (postRow: PostRow): PostParent => ({
	__typename: "Post",
	...postRow,
	id: postRow.id.toString(),
	title: postRow.title,
	mdContent: postRow.md_content || "",
	publishedAt: postRow.published_at,
	createdAt: postRow.created_at || null,
	updatedAt: postRow.updated_at || null,
	deletedAt: postRow.deleted_at || null,
})
