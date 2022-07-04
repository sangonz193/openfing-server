import gql from "graphql-tag"

export default gql`
	union CourseClassListByIdResult = CourseClassList | NotFoundError

	extend type Query {
		courseClassListById(id: ID!): CourseClassListByIdResult!
	}
`
