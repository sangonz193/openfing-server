import gql from "graphql-tag"

export default gql`
	type CourseEdition {
		id: ID!

		name: String
		semester: Int
		year: Int

		courseClassLists: [CourseClassList!]!
		course: Course

		createdAt: ISODateTime
		updatedAt: ISODateTime
		deletedAt: ISODateTime

		createdBy: User
		updatedBy: User
		deletedBy: User
	}
`
