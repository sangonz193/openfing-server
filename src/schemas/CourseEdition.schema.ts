import gql from "graphql-tag";

export default gql`
	type CourseEdition {
		id: ID!

		name: String
		semester: Int
		year: Int

		courseClassLists: [CourseClassList!]!
		course: Course

		createdAt: String
		updatedAt: String
		deletedAt: String

		createdBy: User
		updatedBy: User
		deletedBy: User
	}
`;
