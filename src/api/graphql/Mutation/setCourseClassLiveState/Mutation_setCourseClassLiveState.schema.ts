import gql from "graphql-tag";

export default gql`
	extend type Mutation {
		setCourseClassLiveState(input: SetCourseClassLiveStateInput!, secret: String!): SetCourseClassLiveStateResult!
	}

	input SetCourseClassLiveStateInput {
		courseClassRef: CourseClassRef!
		data: SetCourseClassLiveStateDataInput
	}

	input SetCourseClassLiveStateDataInput {
		inProgress: Boolean
		html: String
		startDate: ISODate
	}

	type SetCourseClassLiveStatePayload {
		courseClassLiveState: CourseClassLiveState!
	}

	union SetCourseClassLiveStateResult = SetCourseClassLiveStatePayload | GenericError | AuthenticationError
`;
