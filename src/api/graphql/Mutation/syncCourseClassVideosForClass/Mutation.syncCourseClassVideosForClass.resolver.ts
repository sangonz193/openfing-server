import { getCourseClassFromRef } from "../../_utils/getCourseClassFromRef"
import { getCourseClassListFromRef } from "../../_utils/getCourseClassListFromRef"
import { syncCourseClassVideosForClass } from "../../_utils/syncCourseClassVideosForClass"
import { getCourseClassParent } from "../../CourseClass/CourseClass.parent"
import { getGenericErrorParent } from "../../GenericError/GenericError.parent"
import { withAuthenticatedUser } from "../../middlewares/withAuthenticatedUser"
import { Resolvers } from "../../schemas.types"
import { getSyncCourseClassVideosForClassPayloadParent } from "./SyncCourseClassVideosForClassPayload.parent"

const resolver: Resolvers["Mutation"]["syncCourseClassVideosForClass"] = withAuthenticatedUser(
	async (_, args, context) => {
		const courseClass = await getCourseClassFromRef(
			args.courseClassRef,
			{
				includeDisabled: true,
				includeHidden: true,
			},
			context
		)

		if (typeof courseClass?.number !== "number" || typeof courseClass.course_class_list_id !== "string") {
			return getGenericErrorParent()
		}

		const courseClassList = await getCourseClassListFromRef(
			{
				byId: {
					id: courseClass.course_class_list_id,
				},
			},
			{
				includeDisabled: true,
				includeHidden: true,
			},
			context
		)

		if (!courseClassList) {
			console.log("courseClassList not found")
			return getGenericErrorParent()
		}

		await syncCourseClassVideosForClass({
			number: courseClass.number,
			context,
			courseClassList: courseClassList,
			userId: context.user.sub,
		})

		const updatedCourseClass = await context.repositories.courseClass.findOne({
			courseClassListId: courseClassList.id,
			id: courseClass.id,
			includeDisabled: true,
			includeHidden: true,
		})

		if (!updatedCourseClass) {
			console.log("updatedCourseClass not found")
			return getGenericErrorParent()
		}

		return getSyncCourseClassVideosForClassPayloadParent({
			courseClass: getCourseClassParent(updatedCourseClass),
		})
	}
)

export default resolver
