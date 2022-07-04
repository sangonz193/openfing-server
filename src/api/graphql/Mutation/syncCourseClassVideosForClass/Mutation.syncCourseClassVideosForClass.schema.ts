import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		syncCourseClassVideosForClass(courseClassRef: CourseClassRef!): SyncCourseClassVideosForClassResult
	}

	type SyncCourseClassVideosForClassPayload {
		courseClass: CourseClass!
	}

	union SyncCourseClassVideosForClassResult =
		  SyncCourseClassVideosForClassPayload
		| NotFoundError
		| AuthenticationError
		| GenericError
`
