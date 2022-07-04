import { FieldColumn, PrimaryColumn } from "../_utils/Column"
import { EntityRow, TypedEntitySchema } from "../_utils/createTypedEntitySchema"
import { NamedColumns } from "../_utils/NamedColumns"

export type AllowedEmail_id = PrimaryColumn<"uuid">
export type AllowedEmail_emailAddress = FieldColumn<{ name: "email_address"; sqlType: "varchar"; nullable: false }>

export type AllowedEmailColumns = NamedColumns<{
	id: AllowedEmail_id
	emailAddress: AllowedEmail_emailAddress
}>

export type AllowedEmailRelations = {}

export type AllowedEmailEntitySchema = TypedEntitySchema<{
	name: "AllowedEmail"
	columns: AllowedEmailColumns
	relations: AllowedEmailRelations
}>

export type AllowedEmailRow = EntityRow<AllowedEmailEntitySchema>
