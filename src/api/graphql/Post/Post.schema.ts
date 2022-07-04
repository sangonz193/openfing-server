import gql from "graphql-tag"

export default gql`
	type Post {
		id: ID!

		title: String!
		mdContent: String!
		publishedAt: ISODateTime

		createdAt: ISODateTime
		createdBy: User

		updatedAt: ISODateTime
		updatedBy: User

		deletedAt: ISODateTime
		deletedBy: User
	}
`
