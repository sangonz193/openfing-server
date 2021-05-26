import ffprobe from "ffprobe"
import { path as ffprobePath } from "ffprobe-static"

export const getResolutionFromVideoUrl = async (url: string): Promise<{ width: number; height: number } | null> => {
	return ffprobe(url, {
		path: ffprobePath,
	})
		.then((streams) => {
			const streamWithResolution = streams.streams.find((s) => s.width && s.height)

			if (!streamWithResolution) {
				throw new Error(`Resolution not found for ${url}`)
			}

			const { height, width } = streamWithResolution

			return { height: height || 0, width: width || 0 }
		})
		.catch(() => null)
}
