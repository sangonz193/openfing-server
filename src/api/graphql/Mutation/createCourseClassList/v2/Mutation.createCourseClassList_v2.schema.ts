import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		createCourseClassList_v2(input: CreateCourseClassListInput!): CreateCourseClassListResult!
	}
`
