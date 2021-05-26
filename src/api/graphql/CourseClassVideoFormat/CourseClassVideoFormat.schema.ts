import gql from "graphql-tag"

export default gql`
	type CourseClassVideoFormat {
		id: ID!

		name: String
		url: String
		hasTorrent: Boolean

		quality: CourseClassVideoQuality

		createdAt: String
		updatedAt: String
		deletedAt: String

		createdBy: User
		deletedBy: User
		updatedBy: User
	}
`
