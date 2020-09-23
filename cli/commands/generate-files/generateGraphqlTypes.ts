import { executeCodegen } from "@graphql-codegen/cli";
import * as typescriptPlugin from "@graphql-codegen/typescript";
import * as typescriptResolversPlugin from "@graphql-codegen/typescript-resolvers";
import { glob } from "glob";
import { GraphQLSchema, printSchema } from "graphql";
import path from "path";

import { fs } from "../../_utils/fs";
import { projectPath } from "../../_utils/projectPath";

export type GenerateGraphqlOptions = {
	schema: GraphQLSchema;
};

export const generateGraphqlTypes = async (options: GenerateGraphqlOptions): Promise<string[]> => {
	const typesFilePath = path.resolve(projectPath, "src", "generated", "graphql.types.ts");
	const parentFilesGlob = path.resolve(projectPath, "src", "resolvers", "**", "*.parent.ts");

	const generatedFilesPaths: string[] = [];

	const schema = printSchema(options.schema);
	const parentFilesPaths = (
		await new Promise<string[]>((resolve, reject) =>
			glob(parentFilesGlob, (error, files) => {
				if (error) reject(error);
				else resolve(files);
			})
		)
	).sort();

	const parentFilesMetadata = parentFilesPaths.map((parentFilePath) => {
		return {
			importPath: path.relative(path.resolve(typesFilePath, ".."), parentFilePath.replace(/\.[^.]+$/, "")),
			symbolName: path.basename(parentFilePath).replace(".parent.ts", "") + "Parent",
		};
	});

	const codegenResult = await executeCodegen({
		silent: true,
		schema,
		pluginLoader: (name) => {
			if (name.endsWith("typescript")) return typescriptPlugin;
			if (name.endsWith("typescriptResolvers")) return typescriptResolversPlugin;

			throw new Error(name + " not found");
		},
		generates: {
			[typesFilePath]: {
				plugins: [
					{
						typescript: {
							nonOptionalTypename: true,
						},
					},
					{
						typescriptResolvers: {
							contextType: "../Context#Context",
							avoidOptionals: true,
							mappers: {
								...parentFilesMetadata.reduce(
									(prev, value) => ({
										...prev,
										[value.symbolName.replace(
											/Parent$/,
											""
										)]: `${value.importPath}#${value.symbolName}`,
									}),
									{}
								),
							},
						},
					},
				],
			},
		},
	});

	await Promise.all(
		codegenResult.map(async (result) => {
			generatedFilesPaths.push(result.filename);

			await fs.writeFile(
				result.filename,
				`import { OptionalUndefinedKeys, SafeOmit } from "${path.relative(
					path.resolve(result.filename, ".."),
					path.resolve(projectPath, "src", "_utils", "utilTypes")
				)}";\n` +
					result.content.replace(/\bResolvers\b/g, "_Resolvers") +
					`\n` +
					`export type ResolversByParent<TResolvers, TParent> = OptionalUndefinedKeys<
						{
							[TResolverKey in keyof TResolvers]: TResolverKey extends keyof TParent
								? TResolvers[TResolverKey] extends Resolver<infer TResolverValueType, any, any, any>
									? TParent[TResolverKey] extends TResolverValueType
										? TResolvers[TResolverKey] | undefined
										: TResolvers[TResolverKey]
									: TResolvers[TResolverKey]
								: TResolvers[TResolverKey];
						}
					>;\n\n` +
					`export type CustomResolvers = {\n${parentFilesMetadata
						.map(
							(metadata) =>
								`${metadata.symbolName.replace(
									/Parent$/,
									""
								)}: ResolversByParent<_Resolvers["${metadata.symbolName.replace(/Parent$/, "")}"], ${
									metadata.symbolName
								}>;`
						)
						.join("\n")}\n};` +
					"\n\n" +
					`export type Resolvers = SafeOmit<_Resolvers, keyof CustomResolvers> & CustomResolvers;\n`
			);
		})
	);

	await fs
		.readFile(typesFilePath, "utf-8")
		.then((content) =>
			fs.writeFile(typesFilePath, `/* eslint-disable @typescript-eslint/no-explicit-any */\n` + content)
		);

	return generatedFilesPaths;
};
