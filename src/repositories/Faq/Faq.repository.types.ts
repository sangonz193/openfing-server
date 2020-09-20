import { SafeOmit } from "../../_utils/utilTypes";
import { TypedRepository } from "../../entities/_utils/TypedRepository";
import { Faq, FaqRow } from "../../entities/Faq/Faq.entity.types";

export type SaveFaqData = FaqRow;

export type CreateFaqData = SafeOmit<
	FaqRow,
	"id" | "createdAt" | "updatedAt" | "deletedAt" | "updatedById" | "deletedById"
> &
	Partial<Pick<FaqRow, "id" | "createdAt" | "updatedAt" | "deletedAt" | "updatedById" | "deletedById">>;

export type FaqRepository = {
	_typedRepository: TypedRepository<Faq>;

	findAll: () => Promise<FaqRow[]>;

	create: (data: CreateFaqData) => SaveFaqData;
	save: (data: SaveFaqData) => Promise<FaqRow>;
};
