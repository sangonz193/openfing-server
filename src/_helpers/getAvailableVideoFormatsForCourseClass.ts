import { getResolutionFromVideoUrl } from "./getResolutionFromVideoUrl";

export const getAvailableVideoFormatsForCourseClass = async ({
	courseClassListCode,
	courseClassNo,
}: {
	courseClassListCode: string;
	courseClassNo: number;
}): Promise<Array<{ url: string; formatName: string }>> => {
	const baseUrl = `https://openfing-video.fing.edu.uy/media/${courseClassListCode}/${courseClassListCode}_${courseClassNo
		.toString()
		.padStart(2, "0")}`;
	const possibleFormatNames = ["webm", "mp4"];

	const result: Array<{ url: string; formatName: string }> = [];

	await Promise.all(
		possibleFormatNames.map(async (formatName) => {
			const url = `${baseUrl}.${formatName}`;
			const resolution = await getResolutionFromVideoUrl(url);

			if (resolution) result.push({ url, formatName });
		})
	);

	return result;
};
