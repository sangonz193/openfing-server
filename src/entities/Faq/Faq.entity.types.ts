import { Column, EntityRow, PrimaryColumn, TypedEntitySchema } from "../_utils/createTypedEntitySchema";
import { UserToFaq_created, UserToFaq_deleted, UserToFaq_updated } from "../User/User.entity.types";

export type Faq_id = PrimaryColumn<{ name: "id"; type: "uuid"; entity: Faq }>;
export type Faq_title = Column<{ name: "title"; type: "varchar" }>;
export type Faq_content = Column<{ name: "content"; type: "text" }>;
export type Faq_isHtml = Column<{ name: "is_html"; type: "boolean" }>;
export type Faq_position = Column<{ name: "position"; type: "smallint" }>;
export type Faq_createdAt = Column<{ name: "created_at"; type: "timestamp with time zone" }>;
export type Faq_updatedAt = Column<{ name: "updated_at"; type: "timestamp with time zone" }>;
export type Faq_deletedAt = Column<{ name: "deleted_at"; type: "timestamp with time zone" }>;

export type FaqColumns = {
	id: Faq_id;

	title: Faq_title;
	content: Faq_content;
	isHtml: Faq_isHtml;
	position: Faq_position;

	createdAt: Faq_createdAt;
	updatedAt: Faq_updatedAt;
	deletedAt: Faq_deletedAt;

	createdById: UserToFaq_created["to"]["column"];
	updatedById: UserToFaq_updated["to"]["column"];
	deletedById: UserToFaq_deleted["to"]["column"];
};

export type FaqRelations = {
	createdBy: UserToFaq_created["to"]["relation"];
	updatedBy: UserToFaq_updated["to"]["relation"];
	deletedBy: UserToFaq_deleted["to"]["relation"];
};

export type Faq = TypedEntitySchema<{ name: "faq"; columns: FaqColumns; relations: FaqRelations }>;

export type FaqRow = EntityRow<Faq>;
