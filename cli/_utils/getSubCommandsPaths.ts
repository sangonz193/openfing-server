import { getMatchingFilePathsSync } from "@sangonz193/utils/node/getMatchingFilePaths"
import path from "path"

export const getSubCommandsPaths = (directoryPath: string): string[] => {
	const matchingFiles = getMatchingFilePathsSync(path.resolve(directoryPath, "*.command.ts")).concat(
		getMatchingFilePathsSync(path.resolve(directoryPath, "**/*.command.ts"))
	)

	return matchingFiles
}
