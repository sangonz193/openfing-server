import gql from "graphql-tag"

export default gql`
	type Post {
		id: ID!

		title: String!
		content: String!
		htmlContent: String!
		shortContent: String!

		createdAt: String
		createdBy: User

		updatedAt: String
		updatedBy: User

		deletedAt: String
		deletedBy: User
	}
`
