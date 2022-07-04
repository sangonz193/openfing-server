import { CourseClassVideoFormatRow } from "../../../../database/CourseClassVideoFormat/CourseClassVideoFormat.entity.types"
import { Repositories } from "../../../../database/repositories"
import { VideoResolution } from "../../../../modules/miscellaneous/getVideoResolutions"
import { syncFormat } from "./syncFormat"

export async function syncFormats(options: {
	formatRows: CourseClassVideoFormatRow[]
	courseClassVideoQualityId: string | null
	userId: string | null
	videoResolution: VideoResolution
	repositories: Repositories
}) {
	const { formatRows, courseClassVideoQualityId, userId, videoResolution, repositories } = options
	const resultFormatRows: CourseClassVideoFormatRow[] = []

	for (const videoResolutionFormat of videoResolution.formats) {
		resultFormatRows.push(
			await syncFormat({
				courseClassVideoQualityId,
				videoResolutionFormat,
				userId,
				formatRows,
				repositories,
			})
		)
	}

	for (const formatRow of formatRows) {
		const videoResolutionFormat = videoResolution.formats.find((videoResolutionFormat) => {
			return videoResolutionFormat.name === formatRow.name && videoResolutionFormat.url === formatRow.url
		})

		if (!videoResolutionFormat) {
			await repositories.courseClassVideoFormat.delete(formatRow.id, { deleted_by_id: userId })
		}
	}
}
