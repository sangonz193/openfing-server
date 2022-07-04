import gql from "graphql-tag"

export default gql`
	extend type Query {
		courseById(id: ID!): CourseByIdResult!
	}

	union CourseByIdResult = Course | NotFoundError
`
