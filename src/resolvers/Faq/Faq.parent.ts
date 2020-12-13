import { SafeOmit } from "../../_utils/utilTypes";
import { FaqRow } from "../../entities/Faq/Faq.entity.types";
import { Faq } from "../../generated/graphql.types";

export type FaqParent = Required<
	SafeOmit<FaqRow, "id" | "title" | "content" | "is_html" | "created_at" | "updated_at" | "deleted_at">
> &
	Pick<Required<Faq>, "__typename" | "id" | "title" | "content" | "isHtml" | "createdAt" | "updatedAt" | "deletedAt">;

export const getFaqParent = (faqRow: FaqRow): FaqParent => ({
	__typename: "Faq",
	...faqRow,
	id: faqRow.id.toString(),
	title: faqRow.title || "", // TODO: fix
	content: faqRow.content || "", // TODO: fix
	isHtml: faqRow.is_html,
	createdAt: faqRow.created_at?.toISOString() || null,
	updatedAt: faqRow.updated_at?.toISOString() || null,
	deletedAt: faqRow.deleted_at?.toISOString() || null,
});
