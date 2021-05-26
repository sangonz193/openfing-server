import * as yup from "yup"

import { getInvalidEmailDomainErrorParent } from "../../InvalidEmailDomainError/InvalidEmailDomainError.parent"
import { getInvalidFormatErrorParent } from "../../InvalidFormatError/InvalidFormatError.parent"
import { getMaxLengthErrorParent } from "../../MaxLengthError/MaxLengthError.parent"
import { getMinLengthErrorParent } from "../../MinLengthError/MinLengthError.parent"
import { getRequiredFieldErrorParent } from "../../RequiredFieldError/RequiredFieldError.parent"
import { MutationSignUpArgs } from "../../schemas.types"
import { getSignUpValidationErrorsParent, SignUpValidationErrorsParent } from "./SignUpValidationErrors.parent"

export type ValidatedSignUpInput = MutationSignUpArgs["input"]

export type ValidateSignUpInputResult =
	| {
			success: true
			input: ValidatedSignUpInput
	  }
	| {
			success: false
			errors: SignUpValidationErrorsParent
	  }

export async function validateSignUpInput(args: MutationSignUpArgs): Promise<ValidateSignUpInputResult> {
	type GetErrorParentMap = {
		InvalidEmailDomainError: typeof getInvalidEmailDomainErrorParent
		InvalidFormatError: typeof getInvalidFormatErrorParent
		RequiredFieldError: typeof getRequiredFieldErrorParent
		MaxLengthError: typeof getMaxLengthErrorParent
		MinLengthError: typeof getMinLengthErrorParent
	}

	const errors: {
		[TKey in Exclude<keyof SignUpValidationErrorsParent, "__typename">]: {
			[K in Exclude<SignUpValidationErrorsParent[TKey], null | undefined>[number]["__typename"]]: {
				[TGetErrorParentKey in keyof GetErrorParentMap]: {
					_: GetErrorParentMap[K]
				}
			}[Exclude<SignUpValidationErrorsParent[TKey], null | undefined>[number]["__typename"]]["_"]
		}
	} = {
		email: {
			InvalidEmailDomainError: getInvalidEmailDomainErrorParent,
			InvalidFormatError: getInvalidFormatErrorParent,
			RequiredFieldError: getRequiredFieldErrorParent,
			MaxLengthError: getMaxLengthErrorParent,
		},
		password: {
			MinLengthError: getMinLengthErrorParent,
			MaxLengthError: getMaxLengthErrorParent,
			RequiredFieldError: getRequiredFieldErrorParent,
		},
		firstName: {
			MaxLengthError: getMaxLengthErrorParent,
			RequiredFieldError: getRequiredFieldErrorParent,
			MinLengthError: getMinLengthErrorParent,
		},
		lastName: {
			MaxLengthError: getMaxLengthErrorParent,
		},
	}

	try {
		const validatedInput = await yup
			.object<yup.SchemaOf<ValidatedSignUpInput>["fields"]>({
				email: yup
					.string()
					.trim()
					.required(errors.email.RequiredFieldError())
					.email(errors.email.InvalidFormatError())
					.max(320, ({ max }) => errors.email.MaxLengthError(max))
					.test({
						test(value) {
							if (!value) {
								return true // This is not an error case for this validator.
							}

							const [, domain] = value.split("@")

							if (!domain || domain !== "fing.edu.uy") {
								return this.createError({
									message: errors.email.InvalidEmailDomainError(),
								})
							}

							return true
						},
					}),

				password: yup
					.string()
					.trim()
					.required(errors.password.RequiredFieldError())
					.min(8, ({ min }) => errors.password.MinLengthError(min))
					.max(200, ({ max }) => errors.password.MaxLengthError(max)),

				firstName: yup
					.string()
					.trim()
					.required(errors.firstName.RequiredFieldError())
					.min(1, ({ min }) => errors.firstName.MinLengthError(min))
					.max(200, ({ max }) => errors.firstName.MaxLengthError(max)),

				lastName: yup
					.string()
					.trim()
					.max(200, ({ max }) => errors.lastName.MaxLengthError(max)),
			})
			.required()
			.validate(args.input, {
				abortEarly: false,
			})

		return {
			success: true,
			input: validatedInput,
		}
	} catch (error) {
		const validationErrorParentOptions: Parameters<typeof getSignUpValidationErrorsParent>[0] = {
			email: null,
			firstName: null,
			lastName: null,
			password: null,
		}

		if (!(error instanceof yup.ValidationError)) {
			return {
				success: false,
				errors: getSignUpValidationErrorsParent(validationErrorParentOptions),
			}
		}

		const getMessage = <TErrorsKey extends keyof typeof errors>(
			validationError: yup.ValidationError
		):
			| ReturnType<Extract<typeof errors[TErrorsKey][keyof typeof errors[TErrorsKey]], (...args: any[]) => any>>
			| string
			| undefined => {
			const { message } = validationError

			if (isStringOrUndefined(message)) {
				console.log("Unexpected message", message)
			}

			return message
		}
		const isStringOrUndefined = (value: unknown): value is undefined | string => {
			return typeof value === "string" || value === undefined
		}

		const handleInnerErrorForField = <TField extends keyof typeof errors>(
			field: TField,
			innerError: yup.ValidationError
		) => {
			const message = getMessage<TField>(innerError)
			if (isStringOrUndefined(message)) {
				return
			}

			validationErrorParentOptions[field] = [...(validationErrorParentOptions[field] ?? []), message as any]
		}

		error.inner.forEach((innerError) => {
			const errorPath = innerError.path as keyof ValidatedSignUpInput | undefined

			switch (errorPath) {
				case undefined: {
					break
				}
				case "email": {
					handleInnerErrorForField("email", innerError)
					break
				}
				case "password": {
					handleInnerErrorForField("password", innerError)
					break
				}
				case "firstName": {
					handleInnerErrorForField("firstName", innerError)
					break
				}
				case "lastName": {
					handleInnerErrorForField("lastName", innerError)
					break
				}
			}
		})

		return {
			success: false,
			errors: getSignUpValidationErrorsParent(validationErrorParentOptions),
		}
	}
}
