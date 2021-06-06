import path from "path"

import { getMatchingFilePathsSync } from "./getMatchingFilePaths"

export const getSubCommandsPaths = (directoryPath: string): string[] => {
	const matchingFiles = getMatchingFilePathsSync(path.resolve(directoryPath, "*.command.ts")).concat(
		getMatchingFilePathsSync(path.resolve(directoryPath, "*/*.command.ts"))
	)

	return matchingFiles
}
