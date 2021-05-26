import gql from "graphql-tag"

export default gql`
	type CourseClassVideo {
		id: ID!

		name: String

		qualities: [CourseClassVideoQuality!]!
		courseClass: CourseClass

		createdAt: String
		updatedAt: String
		deletedAt: String

		createdBy: User
		deletedBy: User
		updatedBy: User
	}
`
