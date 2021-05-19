import gql from "graphql-tag";

export default gql`
	type Faq {
		id: ID!

		title: String!
		content: String!
		isHtml: Boolean

		createdAt: String
		createdBy: User

		updatedAt: String
		updatedBy: User

		deletedAt: String
		deletedBy: User
	}
`;
