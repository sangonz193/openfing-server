import gql from "graphql-tag";

export default gql`
	type CourseClass {
		id: ID!

		number: Int
		name: String

		videos: [CourseClassVideo!]!
		chapterCues: [CourseClassChapterCue!]!
		courseClassList: CourseClassList
		publishedAt: String

		createdAt: String
		updatedAt: String

		createdBy: User
		updatedBy: User
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
