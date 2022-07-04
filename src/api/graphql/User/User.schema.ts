import gql from "graphql-tag"

export default gql`
	type User {
		id: ID!

		name: String!
		givenName: String!
		familyName: String
	}
`
