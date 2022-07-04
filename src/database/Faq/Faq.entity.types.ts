import { CreatedByIdColumn, DeletedByIdColumn, FieldColumn, PrimaryColumn, UpdatedByIdColumn } from "../_utils/Column"
import { EntityRow, TypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { NamedColumns } from "../_utils/NamedColumns"

export type Faq_id = PrimaryColumn<"uuid">
export type Faq_title = FieldColumn<{ name: "title"; sqlType: "varchar" }>
export type Faq_content = FieldColumn<{ name: "content"; sqlType: "text" }>
export type Faq_isHtml = FieldColumn<{ name: "is_html"; sqlType: "boolean" }>
export type Faq_position = FieldColumn<{ name: "position"; sqlType: "smallint" }>
export type Faq_createdAt = FieldColumn<{ name: "created_at"; sqlType: "timestamp with time zone" }>
export type Faq_updatedAt = FieldColumn<{ name: "updated_at"; sqlType: "timestamp with time zone" }>
export type Faq_deletedAt = FieldColumn<{ name: "deleted_at"; sqlType: "timestamp with time zone" }>

export type FaqColumns = NamedColumns<{
	id: Faq_id

	title: Faq_title
	content: Faq_content
	isHtml: Faq_isHtml
	position: Faq_position

	createdAt: Faq_createdAt
	updatedAt: Faq_updatedAt
	deletedAt: Faq_deletedAt

	createdById: CreatedByIdColumn
	updatedById: UpdatedByIdColumn
	deletedById: DeletedByIdColumn
}>

export type FaqRelations = {}

export type FaqEntitySchema = TypedEntitySchema<{ name: "faq"; columns: FaqColumns; relations: FaqRelations }>

export type FaqRow = EntityRow<FaqEntitySchema>
