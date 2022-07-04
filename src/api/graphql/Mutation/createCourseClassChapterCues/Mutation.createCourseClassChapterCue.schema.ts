import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		createCourseClassChapterCue(input: CreateCourseClassChapterCueInput!): CreateCourseClassChapterCueResult!
	}

	input CreateCourseClassChapterCueInput {
		courseClassRef: CourseClassRef!
		data: CreateCourseClassChapterCueDataInput!
	}

	input CreateCourseClassChapterCueDataInput {
		name: String!
		startSeconds: Float!
		endSeconds: Float!
	}

	type CreateCourseClassChapterCuePayload {
		courseClassChapterCue: CourseClassChapterCue!
	}

	union CreateCourseClassChapterCueResult =
		  CreateCourseClassChapterCuePayload
		| AuthenticationError
		| GenericError
		| NotFoundError
`
