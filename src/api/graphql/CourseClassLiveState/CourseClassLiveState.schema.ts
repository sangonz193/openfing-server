import gql from "graphql-tag"

export default gql`
	type CourseClassLiveState {
		id: ID!

		html: String
		inProgress: Boolean
		startDate: ISODateTime

		courseClass: CourseClass
	}
`
