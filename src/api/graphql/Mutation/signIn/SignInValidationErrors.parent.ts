import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { SignInValidationErrors } from "../../schemas.types"

export type SignInValidationErrorsParent = Required<SignInValidationErrors>

export const getSignInValidationErrorsParent = (
	options: SafeOmit<SignInValidationErrorsParent, "__typename">
): SignInValidationErrorsParent => ({
	__typename: "SignInValidationErrors",
	...options,
})
