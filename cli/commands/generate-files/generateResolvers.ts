import {
	GraphQLEnumType,
	GraphQLInputObjectType,
	GraphQLObjectType,
	GraphQLScalarType,
	GraphQLSchema,
	GraphQLUnionType,
} from "graphql";
import path from "path";

import { fs } from "../../_utils/fs";
import { fsExists } from "../../_utils/fsExists";
import { projectPath } from "../../_utils/projectPath";

export const generateResolvers = async (schema: GraphQLSchema): Promise<string[]> => {
	const resolversFilePath = path.resolve(projectPath, "src", "generated", "resolvers.ts");
	const generatedTypesFilePath = path.resolve(projectPath, "src", "generated", "graphql.types.ts");
	const resolversFolderPath = path.resolve(projectPath, "src", "resolvers");

	const generatedFilesPaths: string[] = [resolversFilePath];

	type DefaultFieldResolverMetadata = {
		type: "default-field-resolver";
		name: string;
		value: string;
	};

	type FieldResolverMetadata = {
		type: "field-resolver";
		filePath: string;
		symbolName: string;
		name: string;
	};

	type ObjectResolverMetadata = {
		type: "object-resolver";
		dirPath: string;
		name: string;
		fields: Array<FieldResolverMetadata | DefaultFieldResolverMetadata>;
	};

	type ScalarResolverMetadata = {
		type: "scalar-resolver";
		filePath: string;
		symbolName: string;
		name: string;
	};

	type UnionResolverMetadata = {
		type: "union-resolver";
		name: string;
	};

	const typeMap = schema.getTypeMap();

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
						const type = typeMap[typeMapKey];

						if (type instanceof GraphQLScalarType) {
							const posibleResolverPath = path.resolve(resolversFolderPath, `${type.name}.resolver.ts`);

							if (!(await fsExists(posibleResolverPath))) return undefined;

							return {
								type: "scalar-resolver",
								filePath: posibleResolverPath,
								symbolName: `${path
									.relative(resolversFolderPath, posibleResolverPath)
									.replace(".resolver.ts", "")
									.replace("/", "_")}Resolver`,
								name: type.name,
							};
						}

						if (type instanceof GraphQLUnionType)
							return {
								type: "union-resolver",
								name: type.name,
								value: ``,
							};

						if (type instanceof GraphQLObjectType) {
							const fields = type.getFields();
							const objectResolversDirPath = path.resolve(resolversFolderPath, type.name);

							return {
								type: "object-resolver",
								dirPath: objectResolversDirPath,
								name: type.name,
								fields: (
									await Promise.all(
										Object.keys(fields).map<
											Promise<DefaultFieldResolverMetadata | FieldResolverMetadata | undefined>
										>(async (fieldKey) => {
											const field = fields[fieldKey];

											if ("_" === field.name)
												return {
													type: "default-field-resolver",
													name: field.name,
													value: `_`,
												};

											const resolverFilePath = path.resolve(
												objectResolversDirPath,
												`${field.name}.resolver.ts`
											);

											if (!(await fsExists(resolverFilePath))) return undefined;

											return {
												type: "field-resolver",
												filePath: resolverFilePath,
												name: field.name,
												symbolName: `${path
													.relative(resolversFolderPath, resolverFilePath)
													.replace(".resolver.ts", "")
													.replace("/", "_")}Resolver`,
											};
										})
									)
								)
									.filter((metadata): metadata is Exclude<typeof metadata, undefined> => !!metadata)
									.sort((f1, f2) => f1.name.localeCompare(f2.name)),
							};
						} else if (type instanceof GraphQLEnumType || type instanceof GraphQLInputObjectType)
							// ignore
							return undefined;

						console.log(`Unhandled type`, type);
						return undefined;
					}
				)
		)
	)
		.filter((metadata): metadata is Exclude<typeof metadata, undefined> => !!metadata)
		.sort((m1, m2) => m1.name.localeCompare(m2.name));

	const relativeImport = (relativePath: string) =>
		relativePath.startsWith(".") ? relativePath : "./" + relativePath;

	const imports: string[] = [
		`import { Resolvers } from "${relativeImport(
			path.relative(path.resolve(resolversFilePath, ".."), generatedTypesFilePath.replace(/\.[^.]+$/, ""))
		)}";`,
	];

	resolverMetadatas.forEach((metadata) => {
		const handlers: {
			[K in typeof metadata["type"]]: ((m: Extract<typeof metadata, { type: K }>) => void) | undefined;
		} = {
			"scalar-resolver": (m) =>
				imports.push(
					`import ${m.symbolName} from "${path.relative(
						path.resolve(resolversFilePath, ".."),
						m.filePath.replace(/\.[^.]+$/, "")
					)}";`
				),

			"object-resolver": (m) => {
				const handlers: {
					[K in typeof m.fields[number]["type"]]:
						| ((_: Extract<typeof m["fields"][number], { type: K }>) => void)
						| undefined;
				} = {
					"field-resolver": (m) => {
						imports.push(
							`import ${m.symbolName} from "${path.relative(
								path.resolve(resolversFilePath, ".."),
								m.filePath.replace(/\.[^.]+$/, "")
							)}";`
						);
					},

					"default-field-resolver": undefined,
				};

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				m.fields.forEach((field) => handlers[field.type]?.(field as any));
			},

			"union-resolver": undefined,
		};

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		handlers[metadata.type]?.(metadata as any);
	});

	await fs.writeFile(
		resolversFilePath,
		`${imports.join("\n")}\n\n` +
			`const __resolveType = <T>({ __typename }: { __typename: T }) => __typename;\n\n` +
			`const _ = () => null;\n\n` +
			`export const resolvers: Resolvers = {\n` +
			resolverMetadatas
				.map((resolverMetadata) => {
					if (resolverMetadata.type === "union-resolver")
						return `${resolverMetadata.name}: {\n__resolveType}`;

					if (resolverMetadata.type === "scalar-resolver")
						return `${resolverMetadata.name}: ${resolverMetadata.symbolName}`;

					return (
						`${resolverMetadata.name}: {\n` +
						resolverMetadata.fields
							.map((field) => {
								const handlers: {
									[K in typeof field["type"]]: (f: Extract<typeof field, { type: K }>) => string;
								} = {
									"default-field-resolver": (f) =>
										f.name === f.value ? f.name : `${f.name}: ${f.value}\n`,

									"field-resolver": (f) => `${f.name}: ${f.symbolName}`,
								};

								// eslint-disable-next-line @typescript-eslint/no-explicit-any
								return handlers[field.type](field as any);
							})
							.join(",") +
						`}`
					);
				})
				.join(",") +
			`\n};`
	);

	return generatedFilesPaths;
};
