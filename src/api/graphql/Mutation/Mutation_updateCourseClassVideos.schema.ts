import gql from "graphql-tag";

export default gql`
	extend type Mutation {
		updateCourseClassVideos(courseClassId: ID!, secret: String!): NotFoundError
	}
`;
