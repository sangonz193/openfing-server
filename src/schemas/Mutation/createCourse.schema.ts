import gql from "graphql-tag";

export default gql`
	extend type Mutation {
		createCourse(input: CreateCourseInput!): CreateCourseResult
	}

	input CreateCourseInput {
		code: String!
		name: String!
		eva: String
		editionName: String!
		editionSemester: Int!
		editionYear: Int!
		courseClassListCode: String!
		courseClassListName: String!
	}

	union CreateCourseResult = GenericError | NotFoundError
`;
