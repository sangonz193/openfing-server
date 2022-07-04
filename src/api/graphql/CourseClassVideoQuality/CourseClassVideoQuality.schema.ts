import gql from "graphql-tag"

export default gql`
	type CourseClassVideoQuality {
		id: ID!

		height: Int
		width: Int

		video: CourseClassVideo
		formats: [CourseClassVideoFormat!]!

		createdAt: ISODateTime
		updatedAt: ISODateTime
		deletedAt: ISODateTime

		createdBy: User
		deletedBy: User
		updatedBy: User
	}
`
