import { fs } from "@sangonz193/utils/node/fs"
import { fsExists } from "@sangonz193/utils/node/fsExists"
import { getMatchingFilePaths } from "@sangonz193/utils/node/getMatchingFilePaths"
import path from "path"
import { Project, SyntaxKind } from "ts-morph"

import { projectPath } from "../../_utils/projectPath"
import { generatedFileHeaderContent } from "./_utils/generatedFileHeaderContent"
import { getFormattedCode } from "./_utils/getFormatCode"
import { getImportPath } from "./_utils/getImportPath"
import { generatedFilesGlobs } from "./generatedFilesGlobs"

export const generateRepositoriesIndex = async () => {
	const repositoriesFolderPath = path.resolve(generatedFilesGlobs.repositoriesIndex, "..")
	const repositoryIndexFilePath = generatedFilesGlobs.repositoriesIndex
	const repositoryFilesGlob = path.resolve(repositoriesFolderPath, "**", "*.repository.ts")

	const repositoryFilesPaths = (await getMatchingFilePaths(repositoryFilesGlob)).sort()

	const imports: string[] = ['import { Connection } from "typeorm"', 'import { Pool } from "pg"']
	const entities: Array<{ name: string; usesPool: boolean; useContext: boolean }> = []
	const project = new Project({
		tsConfigFilePath: path.resolve(projectPath, "tsconfig.json"),
		skipAddingFilesFromTsConfig: true,
	})

	await Promise.all(
		repositoryFilesPaths.map(async (repositoryFilePath) => {
			const fileName = path.basename(repositoryFilePath)
			const entityNameMatch = fileName.match(/(\w+)\.repository\.ts/)

			if (entityNameMatch) {
				const entityName = entityNameMatch[1]
				const sourceFile = project.addSourceFileAtPath(repositoryFilePath)

				const repositoryTypesFilePath = repositoryFilePath.replace(/\.ts$/, ".types.ts")
				const usesPool = sourceFile
					.getDescendantsOfKind(SyntaxKind.FunctionDeclaration)
					.some((functionDeclaration) => {
						const name = functionDeclaration.getName()
						if (!name) {
							return false
						}
						return (
							name.startsWith("get") &&
							name.endsWith("Repository") &&
							functionDeclaration.getText().includes("(pool: Pool)")
						)
					})
				const usesContext = sourceFile
					.getDescendantsOfKind(SyntaxKind.FunctionDeclaration)
					.some((functionDeclaration) => {
						const name = functionDeclaration.getName()
						if (!name) {
							return false
						}
						return (
							name.startsWith("get") &&
							name.endsWith("Repository") &&
							functionDeclaration.getText().includes("(context: ")
						)
					})
				entities.push({ name: entityName, usesPool: usesPool, useContext: usesContext })

				imports.push(
					`import { get${entityName}Repository } from "${getImportPath(
						repositoryIndexFilePath,
						repositoryFilePath
					)}"`
				)

				const repositoryTypeFilePath = (await fsExists(repositoryTypesFilePath))
					? repositoryTypesFilePath
					: repositoryFilePath
				imports.push(
					`import { ${entityName}Repository } from "${getImportPath(
						repositoryIndexFilePath,
						repositoryTypeFilePath
					)}"`
				)
			}
		})
	)

	const fileContent =
		generatedFileHeaderContent +
		imports.join("\n") +
		"\n\n" +
		`export type Repositories = {\n` +
		entities
			.map(
				(entity) =>
					`${entity.name.replace(/^(.)/, (match) => {
						return match.toLowerCase()
					})}: ${entity.name}Repository;`
			)
			.join("\n") +
		`}\n\n` +
		`export const getRepositories = (connection: Connection, pool: Pool): Repositories => ({\n` +
		entities
			.map((entity) => {
				return `${entity.name.replace(/^(.)/, (match) => {
					return match.toLowerCase()
				})}: get${entity.name}Repository(${
					entity.useContext ? "{pool, connection}" : entity.usesPool ? "pool" : "connection"
				}),`
			})
			.join("\n") +
		`\n});\n`

	await fs.writeFile(repositoryIndexFilePath, getFormattedCode(fileContent))
}
