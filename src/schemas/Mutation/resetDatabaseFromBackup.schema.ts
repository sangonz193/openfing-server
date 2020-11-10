import gql from "graphql-tag";

export default gql`
	extend type Mutation {
		resetDatabaseFromBackup(secret: String!): String
	}
`;
