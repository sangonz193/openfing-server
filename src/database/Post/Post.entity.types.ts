import { CreatedByIdColumn, DeletedByIdColumn, FieldColumn, PrimaryColumn, UpdatedByIdColumn } from "../_utils/Column"
import { EntityRow, TypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { NamedColumns } from "../_utils/NamedColumns"

export type Post_id = PrimaryColumn<"uuid">
export type Post_title = FieldColumn<{ name: "title"; sqlType: "varchar"; nullable: false }>
export type Post_mdContent = FieldColumn<{ name: "md_content"; sqlType: "text"; nullable: false }>
export type Post_publishedAt = FieldColumn<{ name: "published_at"; sqlType: "timestamp with time zone" }>
export type Post_createdAt = FieldColumn<{ name: "created_at"; sqlType: "timestamp with time zone" }>
export type Post_updatedAt = FieldColumn<{ name: "updated_at"; sqlType: "timestamp with time zone" }>
export type Post_deletedAt = FieldColumn<{ name: "deleted_at"; sqlType: "timestamp with time zone" }>

export type PostColumns = NamedColumns<{
	id: Post_id

	title: Post_title
	content: Post_mdContent
	publishedAt: Post_publishedAt

	createdAt: Post_createdAt
	updatedAt: Post_updatedAt
	deletedAt: Post_deletedAt

	createdById: CreatedByIdColumn
	updatedById: UpdatedByIdColumn
	deletedById: DeletedByIdColumn
}>

export type PostRelations = {}

export type PostEntitySchema = TypedEntitySchema<{ name: "post"; columns: PostColumns; relations: PostRelations }>

export type PostRow = EntityRow<PostEntitySchema>
