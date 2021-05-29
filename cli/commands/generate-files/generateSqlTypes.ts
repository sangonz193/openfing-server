import { fs } from "@sangonz193/utils/node/fs"
import path from "path"
import { spawn } from "promisify-child-process"
import { Project, SyntaxKind } from "ts-morph"

import { projectPath } from "../../../src/_utils/projectPath"
import { generatedFileHeaderContent } from "./_utils/generatedFileHeaderContent"
import { getFormattedCode } from "./_utils/getFormatCode"

export async function generateSqlTypes() {
	const project = new Project({
		tsConfigFilePath: path.resolve(projectPath, "tsconfig.json"),
		skipAddingFilesFromTsConfig: true,
	})
	const output = await spawn("npx", ["pgtyped", "-c", "pgtyped.config.js"], {
		cwd: projectPath,
		encoding: "utf8",
	})

	if (typeof output.stdout !== "string") {
		throw new Error(`stdout is not a string.`)
	}

	const generatedFileMessageRegex = /Saved .+ to (.+)$/
	const generatedFilePathMessages = output.stdout.match(new RegExp(generatedFileMessageRegex, "gm"))
	if (!generatedFilePathMessages) {
		return
	}

	await Promise.all(
		generatedFilePathMessages.map(async (generatedFilePathMessage) => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const [, generatedFilePath] = generatedFilePathMessage.match(generatedFileMessageRegex)!
			await replaceGeneratedCode(generatedFilePath, project)
		})
	)
}

async function replaceGeneratedCode(filePath: string, project: Project) {
	const sourceFile = project.addSourceFileAtPath(filePath)

	let queryName: string | undefined
	sourceFile.getInterfaces().forEach((interfaceNode) => {
		interfaceNode.rename(interfaceNode.getName().replace(/I(?=[A-Z])/, ""))
		if (interfaceNode.getName().endsWith("Query")) {
			queryName = interfaceNode.getName().replace(/Query$/, "")
		}
	})

	if (!queryName) {
		throw new Error("No query name found.")
	}

	sourceFile.getAncestors()
	sourceFile.getDescendantsOfKind(SyntaxKind.VariableStatement)
	const objectExportIdentifier = sourceFile.getVariableStatements()[1]?.getDescendantsOfKind(SyntaxKind.Identifier)[0]

	objectExportIdentifier?.rename(objectExportIdentifier.getText() + "PreparedQuery")

	await fs.writeFile(filePath, getFormattedCode(generatedFileHeaderContent + sourceFile.getFullText()))
}
