import gql from "graphql-tag"

export default gql`
	type Faq {
		id: ID!

		title: String!
		content: String!
		isHtml: Boolean

		createdAt: ISODateTime
		createdBy: User

		updatedAt: ISODateTime
		updatedBy: User

		deletedAt: ISODateTime
		deletedBy: User
	}
`
