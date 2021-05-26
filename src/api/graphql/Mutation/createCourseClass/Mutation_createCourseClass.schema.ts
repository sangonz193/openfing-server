import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		createCourseClass(input: CreateCourseClassInput!, secret: String!): CreateCourseClassResult!
	}

	enum CreateCourseClassInputVisibility {
		PUBLIC
		HIDDEN
		DISABLED
	}

	input CreateCourseClassInput {
		courseClassListRef: CourseClassListRef!
		name: String!
		number: Int!
		visibility: CreateCourseClassInputVisibility
	}

	type CreateCourseClassPayload {
		courseClass: CourseClass!
	}

	union CreateCourseClassResult = CreateCourseClassPayload | GenericError | AuthenticationError
`
