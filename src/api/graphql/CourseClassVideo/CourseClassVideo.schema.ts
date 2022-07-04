import gql from "graphql-tag"

export default gql`
	type CourseClassVideo {
		id: ID!

		name: String

		qualities: [CourseClassVideoQuality!]!
		courseClass: CourseClass

		createdAt: ISODateTime
		updatedAt: ISODateTime
		deletedAt: ISODateTime

		createdBy: User
		deletedBy: User
		updatedBy: User
	}
`
