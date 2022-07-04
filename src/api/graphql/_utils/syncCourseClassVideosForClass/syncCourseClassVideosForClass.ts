import { RequestContext } from "../../../../context/RequestContext"
import { CourseClassListRow } from "../../../../database/CourseClassList/CourseClassList.entity.types"
import { getVideoResolutions } from "../../../../modules/miscellaneous/getVideoResolutions"
import { syncQualities } from "./syncQualities"

export type SyncCourseClassVideosForClassOptions = {
	context: RequestContext
	courseClassList: CourseClassListRow
	number: number
	userId: string
}

export type SyncCourseClassVideosForClassResult =
	| {
			type: "success"
	  }
	| {
			type: "courseClassListClassNotFound"
	  }

export async function syncCourseClassVideosForClass(
	options: SyncCourseClassVideosForClassOptions
): Promise<SyncCourseClassVideosForClassResult> {
	const { context, courseClassList, number, userId } = options
	const { repositories } = context

	const courseClass = await repositories.courseClass.findOne({
		includeDisabled: true,
		includeHidden: true,
		courseClassListId: courseClassList.id,
		number: number,
	})

	if (!courseClass) {
		return { type: "courseClassListClassNotFound" }
	}

	const courseClassVideo = await repositories.courseClassVideo
		.findAll({
			courseClassId: courseClass.id,
			includeDisabled: true,
			includeHidden: true,
		})
		.then((courseClassVideos) => {
			if (courseClassVideos.length > 0) {
				return courseClassVideos[0]
			}

			return repositories.courseClassVideo.save(
				repositories.courseClassVideo.create({
					course_class_id: courseClass.id,
					created_by_id: userId,
					name: "Clase",
					position: 1,
					visibility: courseClass.visibility,
				})
			)
		})

	await syncQualities({
		courseClassVideoId: courseClassVideo.id,
		qualityRows: await repositories.courseClassVideoQuality.findAll({
			courseClassVideoId: courseClassVideo.id,
		}),
		repositories,
		userId,
		videoResolutions: await getVideoResolutions(courseClassList.code, number),
	})

	return { type: "success" }
}
