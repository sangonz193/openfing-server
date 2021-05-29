import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		restoreDb(input: RestoreDbInput!): Void
	}

	input RestoreDbInput {
		secret: String!
		includeData: Boolean!
		includeSchema: Boolean!
		dropSchema: Boolean!
	}
`
