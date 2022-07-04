import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		updateCourseClassList_v2(
			ref: CourseClassListRef!
			input: UpdateCourseClassListInput!
		): UpdateCourseClassListResult!
	}
`
