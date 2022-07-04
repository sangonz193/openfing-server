import gql from "graphql-tag"

export default gql`
	extend type Mutation {
		setCourseClassLiveState_v2(input: SetCourseClassLiveStateInput!): SetCourseClassLiveStateResult!
	}
`
