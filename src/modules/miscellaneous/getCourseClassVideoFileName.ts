import { CourseClassRow } from "../../database/CourseClass/CourseClass.entity.types"
import { CourseClassVideoRow } from "../../database/CourseClassVideo/CourseClassVideo.entity.types"
import { CourseClassVideoFormatRow } from "../../database/CourseClassVideoFormat/CourseClassVideoFormat.entity.types"
import { CourseClassVideoQualityRow } from "../../database/CourseClassVideoQuality/CourseClassVideoQuality.entity.types"
import { encryptCourseClassVideoName } from "./encryptCourseClassVideoName"

export type GetCourseClassVideoFileNameOptions = {
	courseClassListCode: string
	courseClass: CourseClassRow
	video: CourseClassVideoRow
	videoIndex: number
	quality: CourseClassVideoQualityRow
	qualityIndex: number
	format: CourseClassVideoFormatRow
}

export const getCourseClassVideoFileName = async (
	options: GetCourseClassVideoFileNameOptions
): Promise<string | null> => {
	const { courseClassListCode, courseClass, video, videoIndex, quality, qualityIndex, format } = options
	const { number } = courseClass

	if (number === null) {
		return null
	}

	let result = `${courseClassListCode}_${number.toString().padStart(2, "0")}`

	if (videoIndex !== 0 && video.name) {
		result += `_${video.name}`
	}
	if (qualityIndex !== 0 && quality.height) {
		result += `_${quality.height}`
	}

	if (courseClass.visibility === "disabled") {
		const encryptedName = await encryptCourseClassVideoName(result)

		if (encryptedName === null) {
			return null
		}

		result = encryptedName
	}

	if (format.name) {
		result += `.${format.name}`
	}

	return result
}
