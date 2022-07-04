import { getMatchingFilePathsSync } from "@sangonz193/utils/node/getMatchingFilePaths"
import path from "path"
import type { NodePlopAPI } from "plop"

export default (plop: NodePlopAPI) => {
	const matchingFilePaths = getMatchingFilePathsSync(
		path.resolve(__dirname, "..", "commands", "**", "*.plop-generator.ts")
	)
	matchingFilePaths.forEach((matchingFilePath) => {
		const generatorName = matchingFilePath.match(/(\w+)\.plop-generator\.ts$/)?.[1]

		if (!generatorName) {
			console.log(`Could not get generator name from "${matchingFilePath}"`)
			return
		}

		plop.setGenerator(generatorName, require(matchingFilePath).default(plop))
	})
}
