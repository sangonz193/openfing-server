import gql from "graphql-tag";

export default gql`
	type CourseClass {
		id: ID!

		number: Int
		name: String

		videos: [CourseClassVideo!]!
		chapterCues: [CourseClassChapterCue!]!
		courseClassList: CourseClassList

		createdAt: String
		updatedAt: String
		deletedAt: String

		createdBy: User
		updatedBy: User
		deletedBy: User
	}

	input CourseClassRefById {
		id: ID!
	}

	input CourseClassRefByNumber {
		courseClassList: CourseClassListRef!
		number: Int!
	}

	input CourseClassRef {
		byId: CourseClassRefById
		byNumber: CourseClassRefByNumber
	}
`;
