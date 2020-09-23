import gql from "graphql-tag";

const schema = gql`
	scalar Void

	type Query {
		_: Void
	}

	type Mutation {
		_: Void
		backupDb(secret: String!): Void
	}

	type GenericError {
		_: Void
	}

	type NotFoundError {
		_: Void
	}

	type AuthenticationError {
		_: Void
	}
`;

export default schema;
