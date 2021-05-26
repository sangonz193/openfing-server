import gql from "graphql-tag"

export default gql`
	type Course {
		id: ID!

		code: String!
		name: String!
		iconUrl: String
		eva: String

		editions: [CourseEdition!]!

		createdAt: String
		updatedAt: String
		deletedAt: String

		createdBy: User
		updatedBy: User
		deletedBy: User
	}
`
