import gql from "graphql-tag"

export default gql`
	type AllowedEmail {
		id: ID!
		emailAddress: String!
	}
`
