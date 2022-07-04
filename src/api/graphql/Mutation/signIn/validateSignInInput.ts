import * as yup from "yup"

import { getInvalidFormatErrorParent } from "../../InvalidFormatError/InvalidFormatError.parent"
import { getRequiredFieldErrorParent } from "../../RequiredFieldError/RequiredFieldError.parent"
import { MutationSignInArgs } from "../../schemas.types"
import { getSignInValidationErrorsParent, SignInValidationErrorsParent } from "./SignInValidationErrors.parent"

export type ValidatedSignInInput = MutationSignInArgs["input"]

export type ValidateSignInInputResult =
	| {
			success: true
			input: ValidatedSignInInput
	  }
	| {
			success: false
			errors: SignInValidationErrorsParent
	  }

export async function validateSignInInput(args: MutationSignInArgs): Promise<ValidateSignInInputResult> {
	type GetErrorParentMap = {
		InvalidFormatError: typeof getInvalidFormatErrorParent
		RequiredFieldError: typeof getRequiredFieldErrorParent
	}

	const errors: {
		[TKey in Exclude<keyof SignInValidationErrorsParent, "__typename">]: {
			[K in Exclude<SignInValidationErrorsParent[TKey], null | undefined>[number]["__typename"]]: {
				[TGetErrorParentKey in keyof GetErrorParentMap]: {
					_: GetErrorParentMap[K]
				}
			}[Exclude<SignInValidationErrorsParent[TKey], null | undefined>[number]["__typename"]]["_"]
		}
	} = {
		email: {
			InvalidFormatError: getInvalidFormatErrorParent,
			RequiredFieldError: getRequiredFieldErrorParent,
		},
		password: {
			RequiredFieldError: getRequiredFieldErrorParent,
		},
	}

	try {
		const validatedInput = await yup
			.object<yup.SchemaOf<ValidatedSignInInput>["fields"]>({
				email: yup
					.string()
					.trim()
					.required(errors.email.RequiredFieldError())
					.email(errors.email.InvalidFormatError()),
				password: yup.string().trim().required(errors.password.RequiredFieldError()),
			})
			.required()
			.validate(args.input, {
				abortEarly: false,
			})

		return {
			success: true,
			input: validatedInput,
		}
	} catch (error: unknown) {
		const validationErrorParentOptions: Parameters<typeof getSignInValidationErrorsParent>[0] = {
			email: null,
			password: null,
		}

		if (!(error instanceof yup.ValidationError)) {
			return {
				success: false,
				errors: getSignInValidationErrorsParent(validationErrorParentOptions),
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
			const errorPath = innerError.path as keyof ValidatedSignInInput | undefined

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
			}
		})

		return {
			success: false,
			errors: getSignInValidationErrorsParent(validationErrorParentOptions),
		}
	}
}
