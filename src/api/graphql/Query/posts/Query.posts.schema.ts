import { gql } from "apollo-server-core"

export default gql`
	extend type Query {
		posts(orderBy: PostOrder, first: Int, offset: Int, after: String): PostConnection!
	}

	type ConnectionPageInfo {
		hasNextPage: Boolean!
		endCursor: String
	}

	enum ConnectionOrderDirection {
		ASC
		DESC
	}

	input PostOrder {
		field: PostOrderField!
		direction: ConnectionOrderDirection!
	}

	enum PostOrderField {
		PUBLISHED_AT
	}

	type PostConnection {
		edges: [PostEdge!]!
		pageInfo: ConnectionPageInfo!
		totalCount: Int!
	}

	type PostEdge {
		node: Post!
		cursor: String!
	}
`
