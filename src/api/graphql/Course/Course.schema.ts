import gql from "graphql-tag"

export default gql`
	type Course {
		id: ID!

		code: String!
		name: String!
		iconUrl: String
		eva: String
		visibility: CourseVisibility

		editions: [CourseEdition!]!

		createdAt: ISODateTime
		updatedAt: ISODateTime
		deletedAt: ISODateTime

		createdBy: User
		updatedBy: User
		deletedBy: User
	}

	enum CourseVisibility {
		PUBLIC
		HIDDEN
		DISABLED
	}

	input CourseRefById {
		id: ID!
	}

	input CourseRefByCode {
		code: String!
	}

	input CourseRef {
		byId: CourseRefById
		byCode: CourseRefByCode
	}
`
