import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		deletePost(id: ID!): DeletePostResult!
	}

	type DeletePostPayload {
		deleted: Boolean!
	}

	union DeletePostResult = DeletePostPayload | GenericError | AuthenticationError | NotFoundError
`
