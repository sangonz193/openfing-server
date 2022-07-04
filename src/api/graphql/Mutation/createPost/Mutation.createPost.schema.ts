import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		createPost(input: CreatePostInput!): CreatePostResult!
	}

	input CreatePostInput {
		title: String!
		mdContent: String!
		publishedAt: ISODateTime
	}

	type CreatePostPayload {
		post: Post!
	}

	union CreatePostResult = CreatePostPayload | GenericError | AuthenticationError
`
