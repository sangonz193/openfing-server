import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		restoreDb(secret: String!): Void
	}
`
