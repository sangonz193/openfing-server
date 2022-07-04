import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		updateCourseClass_v2(ref: CourseClassRef!, input: UpdateCourseClassInput!): UpdateCourseClassResult!
	}
`
