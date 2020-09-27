import gql from "graphql-tag";

export default gql`
	type CourseClass {
		id: ID!

		number: Int
		name: String

		videos: [CourseClassVideo!]!
		courseClassList: CourseClassList

		createdAt: String
		updatedAt: String
		deletedAt: String

		createdBy: User
		updatedBy: User
		deletedBy: User
	}
`;
