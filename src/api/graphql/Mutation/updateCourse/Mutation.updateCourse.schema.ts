import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		updateCourse(ref: CourseRef!, input: UpdateCourseInput!): UpdateCourseResult!
	}

	input UpdateCourseInput {
		name: String
		visibility: CourseVisibility
		code: String
		eva: String
	}

	type UpdateCoursePayload {
		course: Course!
	}

	union UpdateCourseResult = UpdateCoursePayload | GenericError | AuthenticationError | NotFoundError
`
