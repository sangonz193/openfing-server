import { CourseClassVideoFormatRow } from "../../../../database/CourseClassVideoFormat/CourseClassVideoFormat.entity.types"
import { Repositories } from "../../../../database/repositories"
import { VideoResolutionFormat } from "../../../../modules/miscellaneous/getVideoResolutions"

export async function syncFormat(options: {
	formatRows: CourseClassVideoFormatRow[]
	courseClassVideoQualityId: string | null
	userId: string | null
	videoResolutionFormat: VideoResolutionFormat
	repositories: Repositories
}) {
	const { formatRows, courseClassVideoQualityId, userId, videoResolutionFormat, repositories } = options
	const format = formatRows.find((formatRow) => formatRow.name === videoResolutionFormat.name)

	if (!format) {
		return repositories.courseClassVideoFormat.createAndInsert({
			name: videoResolutionFormat.name,
			url: videoResolutionFormat.url,
			created_by_id: userId,
			course_class_video_quality_id: courseClassVideoQualityId,
		})
	}

	if (!shouldUpdateFormat(format, videoResolutionFormat)) {
		return format
	}

	return repositories.courseClassVideoFormat.update(format.id, {
		updated_by_id: userId,
		name: videoResolutionFormat.name,
		url: videoResolutionFormat.url,
	})
}

function shouldUpdateFormat(format: CourseClassVideoFormatRow, videoResolutionFormat: VideoResolutionFormat) {
	return videoResolutionFormat.url !== format.url || videoResolutionFormat.name !== format.name
}
