import { SafeOmit } from "@sangonz193/utils/SafeOmit"

import { SignUpValidationErrors } from "../../schemas.types"

export type SignUpValidationErrorsParent = Required<SignUpValidationErrors>

export const getSignUpValidationErrorsParent = (
	options: SafeOmit<SignUpValidationErrorsParent, "__typename">
): SignUpValidationErrorsParent => ({
	__typename: "SignUpValidationErrors",
	...options,
})
