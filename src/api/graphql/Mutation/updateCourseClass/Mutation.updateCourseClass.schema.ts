import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		updateCourseClass(
			ref: CourseClassRef!
			input: UpdateCourseClassInput!
			secret: String!
		): UpdateCourseClassResult!
	}

	enum UpdateCourseClassInputVisibility {
		PUBLIC
		HIDDEN
		DISABLED
	}

	input UpdateCourseClassInput {
		name: String
		number: Int
		publishedAt: ISODateTime
		visibility: UpdateCourseClassInputVisibility
	}

	type UpdateCourseClassPayload {
		courseClass: CourseClass!
	}

	union UpdateCourseClassResult = UpdateCourseClassPayload | GenericError | AuthenticationError | NotFoundError
`
