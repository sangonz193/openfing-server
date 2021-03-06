import { fs } from "@sangonz193/utils/node/fs"
import { fsExists } from "@sangonz193/utils/node/fsExists"
import { getMatchingFilePaths } from "@sangonz193/utils/node/getMatchingFilePaths"
import {
	GraphQLEnumType,
	GraphQLInputObjectType,
	GraphQLObjectType,
	GraphQLScalarType,
	GraphQLSchema,
	GraphQLUnionType,
} from "graphql"
import path from "path"

import { generatedFileHeaderContent } from "./_utils/generatedFileHeaderContent"
import { getFormattedCode } from "./_utils/getFormatCode"
import { generatedFilesGlobs } from "./generatedFilesGlobs"

const ignoredScalars = ["ID", "Int", "Float", "Boolean", "String"]

type DefaultFieldResolverMetadata = {
	type: "default-field-resolver"
	name: string
	value: string
}

type FieldResolverMetadata = {
	type: "field-resolver"
	filePath: string
	symbolName: string
	name: string
}

type ObjectResolverMetadata = {
	type: "object-resolver"
	dirPath: string
	name: string
	fields: Array<FieldResolverMetadata | DefaultFieldResolverMetadata>
}

type ScalarResolverMetadata = {
	type: "scalar-resolver"
	filePath: string
	symbolName: string
	name: string
}

type UnionResolverMetadata = {
	type: "union-resolver"
	name: string
}

export const generateResolversIndex = async (schema: GraphQLSchema) => {
	const resolversFolderPath = path.resolve(generatedFilesGlobs.resolversIndex, "..")
	const resolversFilePath = generatedFilesGlobs.resolversIndex
	const generatedTypesFilePath = generatedFilesGlobs.schemasTypeIndex

	const typeMap = schema.getTypeMap()

	const resolverMetadatas = (
		await Promise.all(
			Object.keys(typeMap)
				.filter(
					(typeMapKey) =>
						![
							"__Directive",
							"__EnumValue",
							"__Field",
							"__InputValue",
							"__Schema",
							"__Type",
							"__TypeKind",
							"__DirectiveLocation",
						].includes(typeMapKey) && !typeMapKey.endsWith("Input")
				)
				.map<Promise<ObjectResolverMetadata | ScalarResolverMetadata | UnionResolverMetadata | undefined>>(
					async (typeMapKey) => {
						const type = typeMap[typeMapKey]

						if (type instanceof GraphQLScalarType) {
							const posibleResolverPath =
								(
									await getMatchingFilePaths(
										path.resolve(resolversFolderPath, "**", `*${type.name}.resolver.ts`)
									)
								)[0] || undefined

							if (
								!posibleResolverPath ||
								ignoredScalars.includes(type.name) ||
								!(await fsExists(posibleResolverPath))
							) {
								return undefined
							}

							return {
								type: "scalar-resolver",
								filePath: posibleResolverPath,
								symbolName: `${path
									.relative(resolversFolderPath, posibleResolverPath)
									.replace(".resolver.ts", "")
									.replace(/\w+?\//, "")}Resolver`,
								name: type.name,
							}
						}

						if (type instanceof GraphQLUnionType) {
							return {
								type: "union-resolver",
								name: type.name,
								value: ``,
							}
						}

						if (type instanceof GraphQLObjectType) {
							const fields = type.getFields()
							const objectResolversDirPath = path.resolve(resolversFolderPath, type.name)

							return {
								type: "object-resolver",
								dirPath: objectResolversDirPath,
								name: type.name,
								fields: (
									await Promise.all(
										Object.keys(fields).map<
											Promise<DefaultFieldResolverMetadata | FieldResolverMetadata | undefined>
										>(async (fieldKey) => {
											const field = fields[fieldKey]

											if ("_" === field.name) {
												return {
													type: "default-field-resolver",
													name: field.name,
													value: `_`,
												}
											}

											const resolverFilePath =
												(
													await getMatchingFilePaths(
														path.resolve(
															objectResolversDirPath,
															"**",
															`${type.name}_${field.name}.resolver.ts`
														)
													)
												)[0] ??
												(
													await getMatchingFilePaths(
														path.resolve(
															objectResolversDirPath,
															"**",
															`${type.name}.${field.name}.resolver.ts`
														)
													)
												)[0] ??
												(
													await getMatchingFilePaths(
														path.resolve(
															objectResolversDirPath,
															"**",
															`${field.name}.*.resolver.ts`
														)
													)
												)[0]

											if (!resolverFilePath || !(await fsExists(resolverFilePath))) {
												return undefined
											}

											return {
												type: "field-resolver",
												filePath: resolverFilePath,
												name: field.name,
												symbolName: `${path
													.relative(resolversFolderPath, resolverFilePath)
													.replace(/\.resolver.+/, "")
													.replace(/\./g, "_")
													.replace(/.+\//g, "")}Resolver`,
											}
										})
									)
								)
									.filter((metadata): metadata is Exclude<typeof metadata, undefined> => !!metadata)
									.sort((f1, f2) => f1.name.localeCompare(f2.name)),
							}
						} else if (type instanceof GraphQLEnumType || type instanceof GraphQLInputObjectType) {
							// ignore
							return undefined
						}

						console.log(`Unhandled type`, type)
						return undefined
					}
				)
		)
	)
		.filter((metadata): metadata is Exclude<typeof metadata, undefined> => !!metadata)
		.sort((m1, m2) => m1.name.localeCompare(m2.name))

	const relativeImport = (relativePath: string) => (relativePath.startsWith(".") ? relativePath : "./" + relativePath)

	const imports: string[] = [
		`import { Resolvers } from "${relativeImport(
			path.relative(path.resolve(resolversFilePath, ".."), generatedTypesFilePath.replace(/\.[^.]+$/, ""))
		)}";`,
	]

	resolverMetadatas.forEach((metadata) => {
		switch (metadata.type) {
			case "scalar-resolver":
				imports.push(
					`import ${metadata.symbolName} from "${relativeImport(
						path.relative(path.resolve(resolversFilePath, ".."), metadata.filePath.replace(/\.[^.]+$/, ""))
					)}";`
				)
				break
			case "object-resolver":
				metadata.fields.forEach((field) => {
					switch (field.type) {
						case "field-resolver": {
							imports.push(
								`import ${field.symbolName} from "${relativeImport(
									path.relative(
										path.resolve(resolversFilePath, ".."),
										field.filePath.replace(/\.[^.]+$/, "")
									)
								)}";`
							)
							break
						}
						case "default-field-resolver": {
							break
						}
					}
				})
				break
			case "union-resolver":
		}
	})

	const resolversFileContent =
		generatedFileHeaderContent +
		`${imports.join("\n")}\n\n` +
		`// eslint-disable-next-line @typescript-eslint/ban-ts-comment\n` +
		`// @ts-ignore\n` +
		`// eslint-disable-next-line @typescript-eslint/no-unused-vars\n` +
		`const __resolveType = <T>({ __typename }: { __typename: T }) => __typename;\n\n` +
		`const _ = () => null;\n\n` +
		`export const resolvers: Resolvers = {\n` +
		resolverMetadatas
			.map((resolverMetadata) => {
				if (resolverMetadata.type === "union-resolver") {
					return `${resolverMetadata.name}: {\n__resolveType}`
				}

				if (resolverMetadata.type === "scalar-resolver") {
					return `${resolverMetadata.name}: ${resolverMetadata.symbolName}`
				}

				return (
					`${resolverMetadata.name}: {\n` +
					resolverMetadata.fields
						.map((field) => {
							switch (field.type) {
								case "default-field-resolver":
									return field.name === field.value ? field.name : `${field.name}: ${field.value}\n`
								case "field-resolver":
									return `${field.name}: ${field.symbolName}`
							}
						})
						.join(",") +
					`}`
				)
			})
			.join(",") +
		`\n};`

	await fs.writeFile(resolversFilePath, getFormattedCode(resolversFileContent))
}
