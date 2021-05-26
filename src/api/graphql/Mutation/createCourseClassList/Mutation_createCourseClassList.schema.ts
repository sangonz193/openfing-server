import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		createCourseClassList(input: CreateCourseClassListInput!, secret: String!): CreateCourseClassListResult!
	}

	enum CreateCourseClassListInputVisibility {
		PUBLIC
		HIDDEN
		DISABLED
	}

	input CreateCourseClassListInput {
		courseCode: String!
		code: String!
		name: String!
		semester: Int!
		year: Int!
		visibility: CreateCourseClassListInputVisibility
	}

	type CreateCourseClassListPayload {
		courseClassList: CourseClassList!
	}

	union CreateCourseClassListResult = CreateCourseClassListPayload | GenericError | AuthenticationError
`
