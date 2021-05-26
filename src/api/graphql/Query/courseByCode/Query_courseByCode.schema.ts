import gql from "graphql-tag"

export default gql`
	extend type Query {
		courseByCode(code: String!): CourseByCodeResult!
	}

	union CourseByCodeResult = Course | NotFoundError
`
