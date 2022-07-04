import { ColumnsOptions } from "../_utils/ColumnsOptions"
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { RelationsOptions } from "../_utils/RelationsOptions"
import {
	EmailValidationColumns,
	EmailValidationEntitySchema,
	EmailValidationRelations,
} from "./EmailValidation.entity.types"

export const emailValidationColumns: ColumnsOptions<EmailValidationColumns> = {
	id: {
		name: "id",
		type: "uuid",
		primary: true,
	},

	user_id: {
		name: "user_id",
		type: "uuid",
	},

	issued_at: {
		name: "issued_at",
		type: "timestamp with time zone",
	},
}

export const emailValidationRelations: RelationsOptions<EmailValidationRelations> = {}

export const emailValidationEntitySchema = createTypedEntitySchema<EmailValidationEntitySchema>({
	name: "email_validation",
	columns: emailValidationColumns,
	relations: emailValidationRelations,
})
