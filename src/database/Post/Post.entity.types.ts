import { FieldColumn, PrimaryColumn } from "../_utils/Column"
import { EntityRow, TypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { NamedColumns } from "../_utils/NamedColumns"
import { NamedRelations } from "../_utils/NamedRelations"
import { UserToPost_createdBy, UserToPost_deletedBy, UserToPost_updatedBy } from "../User/User.entity.types"

export type Post_id = PrimaryColumn<"uuid">
export type Post_title = FieldColumn<{ name: "title"; sqlType: "varchar" }>
export type Post_content = FieldColumn<{ name: "content"; sqlType: "text" }>
export type Post_contentHtml = FieldColumn<{ name: "content_html"; sqlType: "text" }>
export type Post_shortContent = FieldColumn<{ name: "short_content"; sqlType: "text" }>
export type Post_publishedAt = FieldColumn<{ name: "published_at"; sqlType: "timestamp with time zone" }>
export type Post_createdAt = FieldColumn<{ name: "created_at"; sqlType: "timestamp with time zone" }>
export type Post_updatedAt = FieldColumn<{ name: "updated_at"; sqlType: "timestamp with time zone" }>
export type Post_deletedAt = FieldColumn<{ name: "deleted_at"; sqlType: "timestamp with time zone" }>

export type PostColumns = NamedColumns<{
	id: Post_id

	title: Post_title
	content: Post_content
	contentHtml: Post_contentHtml
	shortContent: Post_shortContent

	publishedAt: Post_publishedAt

	createdAt: Post_createdAt
	updatedAt: Post_updatedAt
	deletedAt: Post_deletedAt

	createdById: UserToPost_createdBy["to"]["column"]
	updatedById: UserToPost_updatedBy["to"]["column"]
	deletedById: UserToPost_deletedBy["to"]["column"]
}>

export type PostRelations = NamedRelations<{
	createdBy: UserToPost_createdBy["to"]["relation"]
	updatedBy: UserToPost_updatedBy["to"]["relation"]
	deletedBy: UserToPost_deletedBy["to"]["relation"]
}>

export type PostEntitySchema = TypedEntitySchema<{ name: "post"; columns: PostColumns; relations: PostRelations }>

export type PostRow = EntityRow<PostEntitySchema>
