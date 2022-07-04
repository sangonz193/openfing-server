import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		signIn(input: SignInInput!): SignInResult!
	}

	input SignInInput {
		email: String!
		password: String!
	}

	type SignInPayload {
		grant: Grant!
	}

	type EmailNotValidatedError {
		_: Void
	}

	union SignInEmailError = RequiredFieldError | InvalidFormatError
	union SignInPasswordError = RequiredFieldError

	type SignInValidationErrors {
		email: [SignInEmailError!]
		password: [SignInPasswordError!]
	}

	union SignInResult =
		  SignInPayload
		| GenericError
		| AuthenticationError
		| SignInValidationErrors
		| EmailNotValidatedError
`
