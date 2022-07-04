import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		updatePost(id: ID!, input: UpdatePostInput!): UpdatePostResult!
	}

	input UpdatePostInput {
		title: String!
		mdContent: String!
		publishedAt: ISODateTime
	}

	type UpdatePostPayload {
		post: Post!
	}

	union UpdatePostResult = UpdatePostPayload | GenericError | AuthenticationError | NotFoundError
`
