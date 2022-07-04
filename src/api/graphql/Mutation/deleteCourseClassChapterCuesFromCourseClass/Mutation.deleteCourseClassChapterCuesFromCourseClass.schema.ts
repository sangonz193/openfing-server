import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		deleteCourseClassChapterCuesFromCourseClass(
			input: DeleteCourseClassChapterCuesFromCourseClassInput!
		): DeleteCourseClassChapterCuesFromCourseClassResult!
	}

	input DeleteCourseClassChapterCuesFromCourseClassInput {
		courseClassRef: CourseClassRef!
	}

	type DeleteCourseClassChapterCuesFromCourseClassPayload {
		courseClass: CourseClass!
	}

	union DeleteCourseClassChapterCuesFromCourseClassResult =
		  DeleteCourseClassChapterCuesFromCourseClassPayload
		| GenericError
		| NotFoundError
		| AuthenticationError
`
