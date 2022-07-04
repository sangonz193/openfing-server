import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		sendVerifyEmail(input: SendVerifyEmailInput!): SendVerifyEmailResult!
	}

	input SendVerifyEmailInput {
		email: String!
	}

	type SendVerifyEmailPayload {
		_: Void
	}

	union SendVerifyEmailResult = SendVerifyEmailPayload | GenericError
`
