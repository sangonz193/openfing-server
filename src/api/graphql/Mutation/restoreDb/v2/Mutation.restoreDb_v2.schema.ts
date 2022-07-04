import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		restoreDb_v2: Void
	}
`
