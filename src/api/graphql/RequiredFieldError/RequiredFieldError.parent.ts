import { RequiredFieldError } from "../schemas.types"

export type RequiredFieldErrorParent = RequiredFieldError

export const getRequiredFieldErrorParent = (): RequiredFieldErrorParent => ({
	__typename: "RequiredFieldError",
	_: null,
})
