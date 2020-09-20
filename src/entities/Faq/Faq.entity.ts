import { commonManagedAtColumns, commonManagedByColumns } from "../_utils/common";
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema";
import { Faq as FaqType, FaqColumns, FaqRelations } from "./Faq.entity.types";

export const faqColumns: FaqColumns = {
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
	isHtml: {
		name: "is_html",
		type: "boolean",
		nullable: true,
	},
	position: {
		name: "position",
		type: "smallint",
		nullable: true,
	},

	createdAt: commonManagedAtColumns.createdAt,
	updatedAt: commonManagedAtColumns.updatedAt,
	deletedAt: commonManagedAtColumns.deletedAt,

	createdById: commonManagedByColumns.createdById,
	updatedById: commonManagedByColumns.updatedById,
	deletedById: commonManagedByColumns.deletedById,
};

export const faqRelations: FaqRelations = {
	createdBy: {
		type: "many-to-one",
		inverseSide: "createdFaqs",
		target: "user",
		name: "createdBy",
		joinColumn: {
			name: "created_by_id",
			referencedColumnName: "id",
		},
	},
	updatedBy: {
		type: "many-to-one",
		inverseSide: "updatedFaqs",
		target: "user",
		joinColumn: {
			name: "updated_by_id",
			referencedColumnName: "id",
		},
		name: "updatedBy",
	},
	deletedBy: {
		type: "many-to-one",
		inverseSide: "deletedFaqs",
		target: "user",
		joinColumn: {
			name: "deleted_by_id",
			referencedColumnName: "id",
		},
		name: "deletedBy",
	},
};

export const Faq: FaqType = createTypedEntitySchema<FaqType>({
	name: "faq",
	columns: faqColumns,
	relations: faqRelations,
});
