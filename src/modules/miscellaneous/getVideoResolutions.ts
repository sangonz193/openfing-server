import { CourseClassListRow } from "../../database/CourseClassList/CourseClassList.entity.types"
import { getResolutionFromVideoUrl } from "./getResolutionFromVideoUrl"

export type VideoResolution = {
	formats: VideoResolutionFormat[]
	height: number
	width: number
}

export type VideoResolutionFormat = {
	url: string
	name: string
}

export async function getVideoResolutions(
	courseClassListCode: CourseClassListRow["code"],
	number: number
): Promise<VideoResolution[]> {
	const videoResolutions: Array<{
		formats: Array<{ url: string; name: string }>
		height: number
		width: number
	}> = []

	const baseVideoUrl = courseClassListCode
		? `https://openfing-video.fing.edu.uy/media/${courseClassListCode}/${courseClassListCode}_${number
				.toString()
				.padStart(2, "0")}`
		: undefined
	const possibleFormatNames = ["webm", "mp4"]

	await Promise.all(
		possibleFormatNames.map(async (formatName) => {
			if (!baseVideoUrl) {
				return
			}

			const url = `${baseVideoUrl}.${formatName}`
			const resolution = await getResolutionFromVideoUrl(url)

			if (resolution) {
				const quality = videoResolutions.find((q) => q.height === resolution.height)
				const format = {
					url,
					name: formatName,
				}

				if (quality) {
					quality.formats.push(format)
				} else {
					videoResolutions.push({
						height: resolution.height,
						width: resolution.width,
						formats: [format],
					})
				}
			}
		})
	)

	return videoResolutions
}
