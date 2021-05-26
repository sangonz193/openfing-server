import gql from "graphql-tag"

export default gql`
	union CourseClassListByCodeResult = CourseClassList | NotFoundError

	extend type Query {
		courseClassListByCode(code: String!): CourseClassListByCodeResult!
	}
`
