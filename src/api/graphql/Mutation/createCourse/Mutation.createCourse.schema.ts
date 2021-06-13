import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		createCourse(input: CreateCourseInput!, secret: String!): CreateCourseResult!
	}

	enum CreateCourseInputVisibility {
		PUBLIC
		HIDDEN
		DISABLED
	}

	input CreateCourseInput {
		code: String!
		name: String!
		eva: String
		visibility: CreateCourseInputVisibility
	}

	type CreateCoursePayload {
		course: Course!
	}

	union CreateCourseResult = CreateCoursePayload | GenericError | AuthenticationError
`
