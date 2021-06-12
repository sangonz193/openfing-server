import { getCourseClassListFromRef } from "../../../api/graphql/_utils/getCourseClassListFromRef"
import { RequestContext } from "../../../context/RequestContext"
import { getVideoResolutions } from "../../../modules/miscellaneous/getVideoResolutions"
import { CourseClassListRow } from "../../CourseClassList/CourseClassList.entity.types"
import { Repositories } from "../../repositories"
import { syncQualities } from "./syncQualities"

export type SyncCourseClassVideosForClassOptions = {
	repositories: Repositories
	courseClassList: CourseClassListRow
	number: number
	userId: string
	context: RequestContext
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
	const { repositories, courseClassList, number, userId, context } = options

	const courseClassListClass = await getCourseClassListFromRef(
		{
			byId: {
				id: courseClassList.id,
			},
		},
		{
			includeDisabled: true,
			includeHidden: true,
		},
		context
	)

	if (!courseClassListClass) {
		return { type: "courseClassListClassNotFound" }
	}

	const currentVideos = await context.repositories.courseClassVideo.findAll({
		courseClassId: courseClassListClass.id,
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
