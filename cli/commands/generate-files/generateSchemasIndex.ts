import { fs } from "@sangonz193/utils/node/fs"
import { getMatchingFilePaths } from "@sangonz193/utils/node/getMatchingFilePaths"
import path from "path"

import { projectPath } from "../../../src/_utils/projectPath"
import { generatedFileHeaderContent } from "./_utils/generatedFileHeaderContent"
import { getFormattedCode } from "./_utils/getFormatCode"
import { generatedFilesGlobs } from "./generatedFilesGlobs"

export const generateSchemasIndex = async () => {
	const typeDefsFilePath = generatedFilesGlobs.schemasIndex
	const schemaFilesGlob = path.resolve(projectPath, "src", "api", "graphql", "**", "*.schema.ts")

	const files = (await getMatchingFilePaths(schemaFilesGlob)).sort()

	const getSymbolFromFilePath = (filePath: string) =>
		`${path
			.basename(filePath)
			.replace(/\.[^.]+$/, "")
			.replace(/\.(\w)/, (value, [letter] = []) => {
				if (typeof letter !== "string" || letter.length !== 1) {
					return value
				}

				return letter.toUpperCase()
			})
			.replace(/[\.]/, "_")}Doc`

	const imports = [
		`import { DocumentNode } from "graphql";\n`,
		...files.map((file) => {
			const relativePath = path.relative(path.resolve(typeDefsFilePath, ".."), file.replace(/\.[^.]+$/, ""))

			return `import ${getSymbolFromFilePath(file)} from "${
				relativePath[0] !== "." ? `./${relativePath}` : relativePath
			}";`
		}),
	]

	await fs.writeFile(
		typeDefsFilePath,
		getFormattedCode(
			generatedFileHeaderContent +
				`${imports.join("\n")}\n\n` +
				`export const typeDefs: DocumentNode[] = [${files
					.map((filePath) => getSymbolFromFilePath(filePath))
					.sort()
					.join(",")}]`
		)
	)
}
