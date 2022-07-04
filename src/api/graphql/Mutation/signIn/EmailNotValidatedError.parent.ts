import { EmailNotValidatedError } from "../../schemas.types"

export type EmailNotValidatedErrorParent = Required<EmailNotValidatedError>

export const getEmailNotValidatedErrorParent = (): EmailNotValidatedErrorParent => ({
	__typename: "EmailNotValidatedError",
	_: null,
})
