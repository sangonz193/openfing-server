import { AllowedEmailRow } from "../../../database/AllowedEmail/AllowedEmail.entity.types"
import { AllowedEmail } from "../schemas.types"

export type AllowedEmailParent = AllowedEmail

export const getAllowedEmailParent = (data: AllowedEmailRow): AllowedEmailParent => ({
	__typename: "AllowedEmail",
	emailAddress: data.email_address,
	id: data.id,
})
