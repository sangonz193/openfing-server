import { ColumnsOptions } from "../_utils/ColumnsOptions"
import { commonManagedColumnsOptions } from "../_utils/commonManagedColumnsOptions"
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { RelationsOptions } from "../_utils/RelationsOptions"
import { FaqColumns, FaqEntitySchema, FaqRelations } from "./Faq.entity.types"

export const faqColumns: ColumnsOptions<FaqColumns> = {
	id: {
		name: "id",
		type: "uuid",
		primary: true,
	},

	title: {
		name: "title",
		type: "varchar",
		nullable: true,
	},
	content: {
		name: "content",
		type: "text",
		nullable: true,
	},
	is_html: {
		name: "is_html",
		type: "boolean",
		nullable: true,
	},
	position: {
		name: "position",
		type: "smallint",
		nullable: true,
	},

	created_at: commonManagedColumnsOptions.created_at,
	updated_at: commonManagedColumnsOptions.updated_at,
	deleted_at: commonManagedColumnsOptions.deleted_at,

	created_by_id: commonManagedColumnsOptions.created_by_id,
	updated_by_id: commonManagedColumnsOptions.updated_by_id,
	deleted_by_id: commonManagedColumnsOptions.deleted_by_id,
}

export const faqRelations: RelationsOptions<FaqRelations> = {}

export const faqEntitySchema = createTypedEntitySchema<FaqEntitySchema>({
	name: "faq",
	columns: faqColumns,
	relations: faqRelations,
})
