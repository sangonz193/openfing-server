import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		updateCourseClassList(
			ref: CourseClassListRef!
			input: UpdateCourseClassListInput!
			secret: String!
		): UpdateCourseClassListResult!
	}

	enum UpdateCourseClassListInputVisibility {
		PUBLIC
		HIDDEN
		DISABLED
	}

	input UpdateCourseClassListInput {
		name: String
		visibility: UpdateCourseClassListInputVisibility
	}

	type UpdateCourseClassListPayload {
		courseClassList: CourseClassList!
	}

	union UpdateCourseClassListResult =
		  UpdateCourseClassListPayload
		| GenericError
		| AuthenticationError
		| NotFoundError
`
