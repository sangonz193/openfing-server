import gql from "graphql-tag"

export default gql`
	type Grant {
		token: String!
		refreshToken: String!
	}
`
