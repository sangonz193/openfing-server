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
		nullable: true,
	},
	content: {
		name: "content",
		type: "text",
		nullable: true,
	},
	content_html: {
		name: "content_html",
		type: "text",
		nullable: true,
	},
	short_content: {
		name: "short_content",
		type: "text",
		nullable: true,
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

export const postRelations: RelationsOptions<PostRelations> = {
	createdBy: {
		name: "createdBy",
		type: "many-to-one",
		inverseSide: "createdPosts",
		target: "user",
		joinColumn: {
			name: "created_by_id",
			referencedColumnName: "id",
		},
	},
	updatedBy: {
		name: "updatedBy",
		type: "many-to-one",
		inverseSide: "updatedPosts",
		target: "user",
		joinColumn: {
			name: "updated_by_id",
			referencedColumnName: "id",
		},
	},
	deletedBy: {
		name: "deletedBy",
		type: "many-to-one",
		inverseSide: "deletedPosts",
		target: "user",
		joinColumn: {
			name: "deleted_by_id",
			referencedColumnName: "id",
		},
	},
}

export const postEntitySchema = createTypedEntitySchema<PostEntitySchema>({
	name: "post",
	columns: postColumns,
	relations: postRelations,
})
