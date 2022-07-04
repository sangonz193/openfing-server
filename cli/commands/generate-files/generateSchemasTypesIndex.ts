import { executeCodegen } from "@graphql-codegen/cli"
import * as typescriptPlugin from "@graphql-codegen/typescript"
import * as typescriptResolversPlugin from "@graphql-codegen/typescript-resolvers"
import { fs } from "@sangonz193/utils/node/fs"
import { getMatchingFilePaths } from "@sangonz193/utils/node/getMatchingFilePaths"
import { GraphQLSchema, printSchema } from "graphql"
import identity from "lodash/identity"
import path from "path"

import { projectPath } from "../../_utils/projectPath"
import { generatedFileHeaderContent } from "./_utils/generatedFileHeaderContent"
import { getFormattedCode } from "./_utils/getFormatCode"
import { getImportPath } from "./_utils/getImportPath"
import { generatedFilesGlobs } from "./generatedFilesGlobs"

export const generateSchemasTypesIndex = async (schema: GraphQLSchema) => {
	const typesFilePath = generatedFilesGlobs.schemasTypeIndex
	const parentFilesGlob = path.resolve(projectPath, "src", "api", "graphql", "**", "*.parent.ts")
	const contextFilePath = path.resolve(projectPath, "src", "context", "RequestContext.ts")

	const stringSchema = printSchema(schema)
	const parentFilesPaths = (await getMatchingFilePaths(parentFilesGlob)).sort()

	const parentFilesMetadata = parentFilesPaths.map((parentFilePath) => {
		return {
			importPath: getImportPath(typesFilePath, parentFilePath),
			symbolName: path.basename(parentFilePath).replace(".parent.ts", "") + "Parent",
		}
	})

	const codegenResult = await executeCodegen({
		silent: true,
		schema: stringSchema,
		pluginLoader: (name) => {
			if (name.endsWith("typescript")) {
				return typescriptPlugin
			}
			if (name.endsWith("typescriptResolvers")) {
				return typescriptResolversPlugin
			}

			throw new Error(name + " not found")
		},
		generates: {
			[typesFilePath]: {
				plugins: [
					{
						typescript: identity<typescriptPlugin.TypeScriptPluginConfig>({
							nonOptionalTypename: true,
							enumsAsTypes: true,
							scalars: {
								ISODate: "Date",
								ISODateTime: "Date",
							},
						}),
					},
					{
						typescriptResolvers: {
							contextType: getImportPath(typesFilePath, contextFilePath) + "#RequestContext",
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
	})

	await Promise.all(
		codegenResult.map(async (result) => {
			await fs.writeFile(
				result.filename,
				getFormattedCode(
					generatedFileHeaderContent +
						`import { OptionalUndefinedKeys } from "${getImportPath(
							result.filename,
							path.resolve(projectPath, "src", "_utils", "OptionalUndefinedKeys.ts")
						)}";\n` +
						`import { SafeOmit } from "@sangonz193/utils/SafeOmit";\n` +
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
									)}: ResolversByParent<_Resolvers["${metadata.symbolName.replace(
										/Parent$/,
										""
									)}"], ${metadata.symbolName}>;`
							)
							.join("\n")}\n};` +
						"\n\n" +
						`export type Resolvers = SafeOmit<_Resolvers, keyof CustomResolvers> & CustomResolvers;\n`
				)
			)
		})
	)
}
