import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		backupDb(secret: String!): Void
	}
`
