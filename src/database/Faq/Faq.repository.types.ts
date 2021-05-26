import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { FaqEntitySchema, FaqRow } from "../../database/Faq/Faq.entity.types"
import { TypedRepository } from "../_utils/TypedRepository"

export type SaveFaqData = FaqRow

export type CreateFaqData = SafeOmit<
	FaqRow,
	"id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id"
> &
	Partial<Pick<FaqRow, "id" | "created_at" | "updated_at" | "deleted_at" | "updated_by_id" | "deleted_by_id">>

export type FaqRepository = {
	_typedRepository: TypedRepository<FaqEntitySchema>

	findAll: () => Promise<FaqRow[]>

	create: (data: CreateFaqData) => SaveFaqData
	save: (data: SaveFaqData) => Promise<FaqRow>
}
