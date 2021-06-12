import { CourseClassVideoQualityRow } from "../../../../database/CourseClassVideoQuality/CourseClassVideoQuality.entity.types"
import { Repositories } from "../../../../database/repositories"
import { VideoResolution } from "../../../../modules/miscellaneous/getVideoResolutions"
import { syncFormats } from "./syncFormats"

export async function syncQuality(options: {
	qualityRows: CourseClassVideoQualityRow[]
	courseClassVideoId: string | null
	userId: string | null
	videoResolution: VideoResolution
	repositories: Repositories
}) {
	const { qualityRows, courseClassVideoId, userId, videoResolution, repositories } = options
	let quality = qualityRows.find((qualityRow) => qualityRow.height === videoResolution.height)

	if (quality) {
		return quality
	}

	quality = await repositories.courseClassVideoQuality.save(
		repositories.courseClassVideoQuality.create({
			course_class_video_id: courseClassVideoId,
			height: videoResolution.height,
			width: videoResolution.width,
			created_by_id: userId,
		})
	)

	const formats = await repositories.courseClassVideoFormat.findAll({ courseClassVideoQualityId: quality.id })

	await syncFormats({
		courseClassVideoQualityId: quality.id,
		userId: userId,
		formatRows: formats,
		repositories,
		videoResolution,
	})

	return quality
}
