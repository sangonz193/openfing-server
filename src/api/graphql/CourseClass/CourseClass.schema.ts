import gql from "graphql-tag"

export default gql`
	type CourseClass {
		id: ID!

		number: Int
		name: String

		liveState: CourseClassLiveState
		videos: [CourseClassVideo!]!
		chapterCues: [CourseClassChapterCue!]!
		courseClassList: CourseClassList
		visibility: CourseClassVisibility
		publishedAt: ISODateTime

		createdAt: ISODateTime
		updatedAt: ISODateTime

		createdBy: User
		updatedBy: User
	}

	enum CourseClassVisibility {
		PUBLIC
		HIDDEN
		DISABLED
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
`
