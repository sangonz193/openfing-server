import gql from "graphql-tag";

export default gql`
	type CourseClassList {
		id: ID!

		code: String!
		name: String

		classes: [CourseClass!]
		courseEdition: CourseEdition

		createdAt: String
		updatedAt: String
		deletedAt: String

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
`;
