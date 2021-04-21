import gql from "graphql-tag";

export default gql`
	type CourseClassLiveState {
		id: ID!

		html: String
		isProgress: Boolean
		startDate: ISODate

		courseClass: CourseClass
	}
`;
