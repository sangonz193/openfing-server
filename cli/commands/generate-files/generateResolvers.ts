import { glob } from "glob";
import path from "path";

import { fs } from "../../_utils/fs";
import { projectPath } from "../../_utils/projectPath";
import { dangerousKeysOf } from "../../../src/_utils/dangerousKeysOf";

export const generateResolvers = async (): Promise<string[]> => {
	const resolversFilePath = path.resolve(projectPath, "src", "generated", "resolvers.ts");
	const generatedTypesFilePath = path.resolve(projectPath, "src", "generated", "graphql.types.ts");
	const resolversFolderPath = path.resolve(projectPath, "src", "resolvers");
	const resolverFilesGlob = path.resolve(resolversFolderPath, "**", "*.resolver.ts");

	const generatedFilesPaths: string[] = [resolversFilePath];

	const resolverFilesPaths = (
		await new Promise<string[]>((resolve, reject) =>
			glob(resolverFilesGlob, (error, files) => {
				if (error) reject(error);
				else resolve(files);
			})
		)
	).sort();

	type FieldResolverMetadata = {
		type: "field-resolver";
		filePath: string;
		symbolName: string;
		resolverName: string;
		parent: string;
	};

	type ScalarResolverMetadata = {
		type: "scalar-resolver";
		filePath: string;
		symbolName: string;
		resolverName: string;
	};

	const resolverMetadatas: Array<FieldResolverMetadata | ScalarResolverMetadata> = resolverFilesPaths.map(
		(filePath) => {
			const isFieldResolver = path.relative(resolversFolderPath, filePath).split(path.sep).length === 2;

			return isFieldResolver
				? {
						type: "field-resolver",
						filePath,
						symbolName: `${path
							.relative(resolversFolderPath, filePath)
							.replace(".resolver.ts", "")
							.replace("/", "_")}Resolver`,
						parent: path.basename(path.resolve(filePath, "..")),
						resolverName: path.basename(filePath).replace(".resolver.ts", ""),
				  }
				: {
						type: "scalar-resolver",
						filePath,
						symbolName: `${path
							.relative(resolversFolderPath, filePath)
							.replace(".resolver.ts", "")
							.replace("/", "_")}Resolver`,
						resolverName: path.basename(filePath).replace(".resolver.ts", ""),
				  };
		}
	);

	const relativeImport = (relativePath: string) =>
		relativePath.startsWith(".") ? relativePath : "./" + relativePath;

	const imports = [
		`import { Resolvers } from "${relativeImport(
			path.relative(path.resolve(resolversFilePath, ".."), generatedTypesFilePath.replace(/\.[^.]+$/, ""))
		)}";`,
		...resolverMetadatas.map(
			(fileMetadata) =>
				`import ${fileMetadata.symbolName} from "${path.relative(
					path.resolve(resolversFilePath, ".."),
					fileMetadata.filePath.replace(/\.[^.]+$/, "")
				)}";`
		),
	];

	const printObject = (fieldResolverMetadatas: FieldResolverMetadata[]): string => {
		return `{\n ${fieldResolverMetadatas
			.map((metadata) => `${metadata.resolverName}: ${metadata.symbolName}`)
			.join(",\n")} \n}`;
	};

	const parsedFileMetadataMap: Record<string, FieldResolverMetadata[] | ScalarResolverMetadata> = {};

	resolverMetadatas.forEach((metadata) => {
		if (metadata.type === "scalar-resolver") parsedFileMetadataMap[metadata.resolverName] = metadata;
		else if (parsedFileMetadataMap[metadata.parent])
			(parsedFileMetadataMap[metadata.parent] as FieldResolverMetadata[]).push(metadata);
		else parsedFileMetadataMap[metadata.parent] = [metadata];
	});

	await fs.writeFile(
		resolversFilePath,
		`${imports.join("\n")}\n\n` +
			`export const resolvers: Resolvers = {\n${dangerousKeysOf(parsedFileMetadataMap)
				.map((key) => {
					const value = parsedFileMetadataMap[key];

					return `${key}: ${Array.isArray(value) ? printObject(value) : value.symbolName}`;
				})
				.join(",")}\n};`
	);

	return generatedFilesPaths;
};
