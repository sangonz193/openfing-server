import gql from "graphql-tag"

export default gql`
	type CourseClassList {
		id: ID!

		code: String!
		name: String

		classes: [CourseClass!]
		courseEdition: CourseEdition

		createdAt: ISODateTime
		updatedAt: ISODateTime
		deletedAt: ISODateTime

		createdBy: User
		updatedBy: User
		deletedBy: User
	}

	input CourseClassListRefById {
		id: ID!
	}

	input CourseClassListRefByCode {
		code: String!
	}

	input CourseClassListRef {
		byId: CourseClassListRefById
		byCode: CourseClassListRefByCode
	}
`
