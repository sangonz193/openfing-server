import { getCourseClassFromRef } from "../../_utils/getCourseClassFromRef"
import { withAuthenticatedUser } from "../../middlewares/withAuthenticatedUser"
import { getNotFoundErrorParent } from "../../NotFoundError/NotFoundError.parent"
import { Resolvers } from "../../schemas.types"
import { getDeleteCourseClassChapterCuesFromCourseClassPayloadParent } from "./DeleteCourseClassChapterCuesFromCourseClassPayload.parent"

const resolver: Resolvers["Mutation"]["deleteCourseClassChapterCuesFromCourseClass"] = withAuthenticatedUser(
	async (_, args, context) => {
		const courseClass = await getCourseClassFromRef(
			args.input.courseClassRef,
			{
				includeDisabled: true,
				includeHidden: true,
			},
			context
		)

		if (!courseClass) {
			return getNotFoundErrorParent()
		}
		await context.repositories.courseClassChapterCue.deleteByCourseClassId(courseClass.id)

		return getDeleteCourseClassChapterCuesFromCourseClassPayloadParent(courseClass)
	}
)

export default resolver
