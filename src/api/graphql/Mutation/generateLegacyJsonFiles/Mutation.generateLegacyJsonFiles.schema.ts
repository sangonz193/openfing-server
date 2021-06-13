import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		generateLegacyJsonFiles(secret: String!): GenerateLegacyJsonFilesResult!
	}

	union GenerateLegacyJsonFilesResult = GenericError | GenerateLegacyJsonFilesPayload

	type GenerateLegacyJsonFilesPayload {
		modifiedFilesCount: Int
	}
`
