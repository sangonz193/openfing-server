import { getCourseClassFromRef } from "../../_utils/getCourseClassFromRef"
import { getGenericErrorParent } from "../../GenericError/GenericError.parent"
import { withAuthenticatedUser } from "../../middlewares/withAuthenticatedUser"
import { getNotFoundErrorParent } from "../../NotFoundError/NotFoundError.parent"
import { Resolvers } from "../../schemas.types"
import { getCreateCourseClassChapterCuePayloadParent } from "./CreateCourseClassChapterCuePayload.parent"
import { validateCreateCourseClassChapterCueDataInput } from "./validateCreateCourseClassChapterCueInput"

const resolver: Resolvers["Mutation"]["createCourseClassChapterCue"] = withAuthenticatedUser(
	async (_, args, context) => {
		const { dataLoaders, user } = context
		const { input } = args
		const validatedDataPromise = validateCreateCourseClassChapterCueDataInput(input.data)

		const courseClass = await getCourseClassFromRef(
			input.courseClassRef,
			{
				includeDisabled: true,
				includeHidden: true,
			},
			context
		)

		const validatedData = await validatedDataPromise

		if (!validatedData.success) {
			console.log("course class not found")
			return getGenericErrorParent()
		}

		if (!courseClass) {
			console.log("course class not found")
			return getNotFoundErrorParent()
		}

		const validatedInput = validatedData.input

		if (validatedData) {
			const courseClassChapterCue = await dataLoaders.courseClassChapterCue.insert.load({
				end_seconds: validatedInput.endSeconds,
				name: validatedInput.name,
				start_seconds: validatedInput.startSeconds,
				created_by_id: user.sub,
				course_class_id: courseClass.id,
			})

			if (!courseClassChapterCue) {
				console.warn(`Could not create courseClassChapterCue ${JSON.stringify(courseClassChapterCue)}`)
				return getGenericErrorParent()
			}

			return getCreateCourseClassChapterCuePayloadParent(courseClassChapterCue)
		}

		return getGenericErrorParent()
	}
)

export default resolver
