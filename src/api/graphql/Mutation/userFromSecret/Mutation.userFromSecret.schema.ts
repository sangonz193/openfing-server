import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		userFromSecret(secret: String!): UserFromSecretResult!
	}

	union UserFromSecretResult = UserFromSecretPayload | AuthenticationError

	type UserFromSecretPayload {
		user: User!
	}
`
