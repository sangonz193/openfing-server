import { Column, PrimaryColumn } from "../_utils/Column"
import { EntityRow, TypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { NamedColumns } from "../_utils/NamedColumns"

export type EmailValidation_id = PrimaryColumn<"uuid">
export type EmailValidation_userId = Column<{ name: "user_id"; sqlType: "uuid" }>
export type EmailValidation_issuedAt = Column<{ name: "issued_at"; sqlType: "timestamp with time zone" }>

export type EmailValidationColumns = NamedColumns<{
	id: EmailValidation_id
	user_id: EmailValidation_userId
	issued_at: EmailValidation_issuedAt
}>

export type EmailValidationRelations = {}

export type EmailValidationEntitySchema = TypedEntitySchema<{
	name: "email_validation"
	columns: EmailValidationColumns
	relations: EmailValidationRelations
}>

export type EmailValidationRow = EntityRow<EmailValidationEntitySchema>
