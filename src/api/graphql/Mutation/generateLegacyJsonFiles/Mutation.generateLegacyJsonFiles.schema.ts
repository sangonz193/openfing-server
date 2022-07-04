import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		generateLegacyJsonFiles(secret: String!): GenerateLegacyJsonFilesResult!
	}

	type GenerateLegacyJsonFilesPayload {
		modifiedFilesCount: Int
	}

	union GenerateLegacyJsonFilesResult = GenericError | GenerateLegacyJsonFilesPayload
`
