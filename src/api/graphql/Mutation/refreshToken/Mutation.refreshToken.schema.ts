import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		refreshToken(input: RefreshTokenInput!): RefreshTokenResult!
	}

	input RefreshTokenInput {
		refreshToken: String!
	}

	type RefreshTokenPayload {
		grant: Grant!
	}

	union RefreshTokenResult = RefreshTokenPayload | GenericError | AuthenticationError
`
