import { ColumnsOptions } from "../_utils/ColumnsOptions"
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { RelationsOptions } from "../_utils/RelationsOptions"
import { AllowedEmailColumns, AllowedEmailEntitySchema, AllowedEmailRelations } from "./AllowedEmail.entity.types"

export const allowedEmailColumns: ColumnsOptions<AllowedEmailColumns> = {
	id: {
		name: "id",
		type: "uuid",
		primary: true,
	},

	email_address: {
		name: "email_address",
		type: "varchar",
	},
}

export const allowedEmailRelations: RelationsOptions<AllowedEmailRelations> = {}

export const allowedEmailEntitySchema = createTypedEntitySchema<AllowedEmailEntitySchema>({
	name: "AllowedEmail",
	columns: allowedEmailColumns,
	relations: allowedEmailRelations,
})
