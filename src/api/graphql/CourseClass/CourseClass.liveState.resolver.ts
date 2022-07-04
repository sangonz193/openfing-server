import { getCourseClassLiveStateParent } from "../CourseClassLiveState/CourseClassLiveState.parent"
import { Resolvers } from "../schemas.types"

const resolver: Resolvers["CourseClass"]["liveState"] = async (parent, _, context) => {
	const liveState = await context.dataLoaders.courseClassLiveState.findCourseClassLiveStateByCourseClassId.load(
		parent.id
	)

	return liveState && getCourseClassLiveStateParent(liveState)
}

export default resolver
