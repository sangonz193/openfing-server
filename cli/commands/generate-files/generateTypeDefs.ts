import { glob } from "glob";
import path from "path";

import { fs } from "../../_utils/fs";
import { projectPath } from "../../../src/_utils/projectPath";

export const generateTypeDefs = async (): Promise<string[]> => {
	const typeDefsFilePath = path.resolve(projectPath, "src", "generated", "typeDefs.ts");
	const schemaFilesGlob = path.resolve(projectPath, "src", "schemas", "**", "*.schema.ts");

	const generatedFilePaths = [typeDefsFilePath];

	const files = await new Promise<string[]>((resolve, reject) =>
		glob(schemaFilesGlob, (error, files) => {
			if (error) reject(error);
			else resolve(files);
		})
	);

	const getSymbolFromFilePath = (filePath: string) => `${path.basename(filePath).replace(".schema.ts", "")}Doc`;

	const imports = [
		`import { DocumentNode } from "graphql";\n`,
		...files.map(
			(file) =>
				`import ${getSymbolFromFilePath(file)} from "${path.relative(
					path.resolve(typeDefsFilePath, ".."),
					file.replace(/\.[^.]+$/, "")
				)}";`
		),
	];

	await fs.writeFile(
		typeDefsFilePath,
		`${imports.join("\n")}\n\n` +
			`export const typeDefs: DocumentNode[] = [${files
				.map((filePath) => getSymbolFromFilePath(filePath))
				.join(",")}]`
	);

	return generatedFilePaths;
};
