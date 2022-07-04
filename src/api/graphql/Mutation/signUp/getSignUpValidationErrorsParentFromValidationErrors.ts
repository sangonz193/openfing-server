import { ValidatorError } from "@sangonz193/ts-validation"
import { transformObject } from "@sangonz193/utils/transformObject"

import { getInvalidEmailDomainErrorParent } from "../../InvalidEmailDomainError/InvalidEmailDomainError.parent"
import { getMaxLengthErrorParent } from "../../MaxLengthError/MaxLengthError.parent"
import { getMinLengthErrorParent } from "../../MinLengthError/MinLengthError.parent"
import { getRequiredFieldErrorParent } from "../../RequiredFieldError/RequiredFieldError.parent"
import { SignUpEmailError, SignUpFirstNameError, SignUpLastNameError, SignUpPasswordError } from "../../schemas.types"
import { getSignUpValidationErrorsParent, SignUpValidationErrorsParent } from "./SignUpValidationErrors.parent"
import { signUpInputValidationSchema } from "./validateSignUpInput"

type ValidationErrors = Exclude<ValidatorError<typeof signUpInputValidationSchema>["errors"], undefined>

export function getSignUpValidationErrorsParentFromValidationErrors(
	validationErrors: ValidationErrors
): SignUpValidationErrorsParent {
	return getSignUpValidationErrorsParent(
		transformObject<ValidationErrors, Parameters<typeof getSignUpValidationErrorsParent>[0]>(validationErrors, {
			email: (errors) => {
				return errors.reduce<SignUpEmailError[]>((result, error) => {
					switch (error.type) {
						case "string-error": {
							break
						}
						case "max-error": {
							result.push(getMaxLengthErrorParent(error.max))
							break
						}
						case "email-domain-error": {
							result.push(getInvalidEmailDomainErrorParent())
							break
						}
					}

					return result
				}, [])
			},

			firstName: (errors) => {
				return errors.reduce<SignUpFirstNameError[]>((result, error) => {
					switch (error.type) {
						case "string-error": {
							result.push(getRequiredFieldErrorParent())
							break
						}
						case "min-error": {
							result.push(getMinLengthErrorParent(error.min))
							break
						}
						case "max-error": {
							result.push(getMaxLengthErrorParent(error.max))
							break
						}
					}

					return result
				}, [])
			},

			lastName: (errors) => {
				return errors.reduce<SignUpLastNameError[]>((result, error) => {
					switch (error.type) {
						case "string-error": {
							break
						}
						case "max-error": {
							result.push(getMaxLengthErrorParent(error.max))
							break
						}
					}

					return result
				}, [])
			},

			password: (errors) => {
				return errors.reduce<SignUpPasswordError[]>((result, error) => {
					switch (error.type) {
						case "string-error": {
							result.push(getRequiredFieldErrorParent())
							break
						}
						case "min-error": {
							result.push(getMinLengthErrorParent(error.min))
							break
						}
						case "max-error": {
							result.push(getMaxLengthErrorParent(error.max))
							break
						}
					}

					return result
				}, [])
			},
		})
	)
}
