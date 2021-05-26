import gql from "graphql-tag"

export default gql`
	type CourseClassChapterCue {
		id: ID!

		name: String!
		startSeconds: Float!
		endSeconds: Float!

		courseClass: CourseClass

		createdAt: String
		updatedAt: String
		deletedAt: String

		createdBy: User
		deletedBy: User
		updatedBy: User
	}
`
