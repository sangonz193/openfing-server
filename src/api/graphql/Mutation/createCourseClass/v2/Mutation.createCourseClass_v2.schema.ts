import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		createCourseClass_v2(input: CreateCourseClassInput!): CreateCourseClassResult!
	}
`
