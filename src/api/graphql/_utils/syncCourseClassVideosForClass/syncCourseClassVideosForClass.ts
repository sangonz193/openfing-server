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

	const currentVideos = await repositories.courseClassVideo.findAll({
		courseClassId: courseClass.id,
		includeDisabled: true,
		includeHidden: true,
	})
	for (const courseClassVideo of currentVideos) {
		await syncQualities({
			courseClassVideoId: courseClassVideo.id,
			qualityRows: await repositories.courseClassVideoQuality.findAll({
				courseClassVideoId: courseClassVideo.id,
			}),
			repositories,
			userId,
			videoResolutions: await getVideoResolutions(courseClassList.code, number),
		})
	}

	return { type: "success" }
}
