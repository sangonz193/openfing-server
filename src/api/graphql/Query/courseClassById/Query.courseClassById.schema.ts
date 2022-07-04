import gql from "graphql-tag"

export default gql`
	union CourseClassByIdResult = CourseClass | NotFoundError

	extend type Query {
		courseClassById(id: ID!): CourseClassByIdResult!
	}
`
