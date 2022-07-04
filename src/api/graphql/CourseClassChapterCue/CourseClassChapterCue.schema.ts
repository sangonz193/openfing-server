import gql from "graphql-tag"

export default gql`
	type CourseClassChapterCue {
		id: ID!

		name: String!
		startSeconds: Float!
		endSeconds: Float!

		courseClass: CourseClass

		createdAt: ISODateTime
		updatedAt: ISODateTime
		deletedAt: ISODateTime

		createdBy: User
		deletedBy: User
		updatedBy: User
	}
`
