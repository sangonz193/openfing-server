import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		createCourse_v2(input: CreateCourseInput!): CreateCourseResult!
	}
`
