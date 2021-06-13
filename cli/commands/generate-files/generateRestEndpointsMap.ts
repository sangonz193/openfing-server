import { dangerousKeysOf } from "@sangonz193/utils/dangerousKeysOf"
import { fs } from "@sangonz193/utils/node/fs"
import { getMatchingFilePaths } from "@sangonz193/utils/node/getMatchingFilePaths"
import path from "path"

import { projectPath } from "../../../src/_utils/projectPath"
import { generatedFileHeaderContent } from "./_utils/generatedFileHeaderContent"
import { getFormattedCode } from "./_utils/getFormatCode"
import { getImportPath } from "./_utils/getImportPath"
import { generatedFilesGlobs } from "./generatedFilesGlobs"

export const generateRestEndpointsMap = async () => {
	const restFolderPath = path.resolve(projectPath, "src", "api", "rest")
	const endpointsMapPath = path.resolve(generatedFilesGlobs.restEndpoints)

	const imports: string[] = []

	const endpointsMap: Record<string, string> = {}

	const endpointFilesPaths = await getMatchingFilePaths(path.resolve(restFolderPath, "**", "*.endpoint.ts"))
	endpointFilesPaths.forEach((endpointFilePath) => {
		const endpointFileRelativePath = path.relative(restFolderPath, endpointFilePath)
		const endpointUrl = path.join(endpointFileRelativePath, "..")

		const symbolName = endpointUrl
			.replace(path.sep, "_")
			.replace(/[:\-.]/g, "_")
			.replace(/\.endpoint.+/, "")

		imports.push(`import ${symbolName} from "${getImportPath(endpointsMapPath, endpointFilePath)}"`)
		endpointsMap[endpointUrl] = symbolName
	})

	const endpointsMapFileContent =
		generatedFileHeaderContent +
		`${imports.join("\n")}\n\n` +
		`export const endpointsMap = {\n` +
		dangerousKeysOf(endpointsMap)
			.map((key) => {
				return `"${key}": ${endpointsMap[key]}`
			})
			.join(",\n") +
		`}\n`

	await fs.writeFile(endpointsMapPath, getFormattedCode(endpointsMapFileContent))
}
