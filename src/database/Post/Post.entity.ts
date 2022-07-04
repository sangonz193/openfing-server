import { ColumnsOptions } from "../_utils/ColumnsOptions"
import { commonManagedColumnsOptions } from "../_utils/commonManagedColumnsOptions"
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { RelationsOptions } from "../_utils/RelationsOptions"
import { PostColumns, PostEntitySchema, PostRelations } from "./Post.entity.types"

export const postColumns: ColumnsOptions<PostColumns> = {
	id: {
		name: "id",
		type: "uuid",
		primary: true,
	},

	title: {
		name: "title",
		type: "varchar",
	},
	md_content: {
		name: "md_content",
		type: "text",
	},
	published_at: {
		name: "published_at",
		type: "timestamp with time zone",
		nullable: true,
	},

	created_at: commonManagedColumnsOptions.created_at,
	updated_at: commonManagedColumnsOptions.updated_at,
	deleted_at: commonManagedColumnsOptions.deleted_at,

	created_by_id: commonManagedColumnsOptions.created_by_id,
	updated_by_id: commonManagedColumnsOptions.updated_by_id,
	deleted_by_id: commonManagedColumnsOptions.deleted_by_id,
}

export const postRelations: RelationsOptions<PostRelations> = {}

export const postEntitySchema = createTypedEntitySchema<PostEntitySchema>({
	name: "post",
	columns: postColumns,
	relations: postRelations,
})
