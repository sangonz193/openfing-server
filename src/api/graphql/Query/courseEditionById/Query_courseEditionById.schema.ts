import gql from "graphql-tag"

export default gql`
	union CourseEditionByIdResult = CourseEdition | NotFoundError

	extend type Query {
		courseEditionById(id: ID!): CourseEditionByIdResult!
	}
`
