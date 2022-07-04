import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		signUp(input: SignUpInput!): SignUpResult
	}

	input SignUpInput {
		firstName: String!
		lastName: String
		email: String!
		password: String!
	}

	union SignUpEmailError = RequiredFieldError | InvalidEmailDomainError | InvalidFormatError | MaxLengthError
	union SignUpFirstNameError = RequiredFieldError | MinLengthError | MaxLengthError
	union SignUpLastNameError = MaxLengthError
	union SignUpPasswordError = RequiredFieldError | MinLengthError | MaxLengthError

	type SignUpValidationErrors {
		email: [SignUpEmailError!]
		firstName: [SignUpFirstNameError!]
		lastName: [SignUpLastNameError!]
		password: [SignUpPasswordError!]
	}

	type SignUpEmailNotSentPayload {
		issueId: String!
	}

	union SignUpResult = GenericError | AuthenticationError | SignUpValidationErrors | SignUpEmailNotSentPayload
`
