import gql from "graphql-tag";

export default gql`
	type UserRole {
		id: ID!
		code: String!
	}
`;
