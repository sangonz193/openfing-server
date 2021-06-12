import { CourseClassVideoQualityRow } from "../../../../database/CourseClassVideoQuality/CourseClassVideoQuality.entity.types"
import { Repositories } from "../../../../database/repositories"
import { VideoResolution } from "../../../../modules/miscellaneous/getVideoResolutions"
import { syncQuality } from "./syncQuality"

export async function syncQualities(options: {
	qualityRows: CourseClassVideoQualityRow[]
	courseClassVideoId: string | null
	userId: string | null
	videoResolutions: VideoResolution[]
	repositories: Repositories
}) {
	const { qualityRows, courseClassVideoId, userId, videoResolutions, repositories } = options
	const resultQualityRows: CourseClassVideoQualityRow[] = []

	for (const videoResolution of videoResolutions) {
		resultQualityRows.push(
			await syncQuality({
				videoResolution,
				userId,
				repositories,
				qualityRows,
				courseClassVideoId,
			})
		)
	}

	for (const qualityRow of qualityRows) {
		const videoResolutionQuality = videoResolutions.find((videoResolution) => {
			return videoResolution.height === qualityRow.height && videoResolution.width === qualityRow.width
		})

		if (!videoResolutionQuality) {
			await repositories.courseClassVideoFormat.delete(qualityRow.id, { deleted_by_id: userId })
		}
	}
}
