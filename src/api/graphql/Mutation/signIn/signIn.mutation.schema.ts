import gql from "graphql-tag";

export default gql`
	extend type Mutation {
		signIn(input: SignInInput!, secret: String!): SignInResult!
	}

	input SignInInput {
		email: String!
		password: String!
	}

	type SignInPayload {
		accessToken: String!
		refreshToken: String!
		idToken: String!
	}

	union SignInEmailError = RequiredFieldError | InvalidFormatError
	union SignInPasswordError = RequiredFieldError

	type SignInValidationErrors {
		email: [SignInEmailError!]
		password: [SignInPasswordError!]
	}

	union SignInResult = SignInPayload | GenericError | AuthenticationError | SignInValidationErrors
`;
