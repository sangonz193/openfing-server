import { CodeFileLoader } from "@graphql-tools/code-file-loader";
import { loadSchema } from "@graphql-tools/load";
import path from "path";
import { spawn } from "promisify-child-process";
import { CommandModule } from "yargs";

import { projectPath } from "../../_utils/projectPath";
import { generateGraphqlTypes } from "./generateGraphqlTypes";
import { generateResolvers } from "./generateResolvers";
import { generateTypeDefs } from "./generateTypeDefs";

const command: CommandModule<{}, {}> = {
	command: "generate-files",

	describe: "Generates the files inside the `src/generated` folder",

	builder: (yargs) => yargs,

	handler: async () => {
		const schemaFilesGlob = path.resolve(projectPath, "src", "schemas", "*.schema.ts");
		const schemaPromise = loadSchema(schemaFilesGlob, { loaders: [new CodeFileLoader()] });

		const results = await Promise.all([
			generateTypeDefs(),
			schemaPromise.then((schema) => generateResolvers(schema)),
			schemaPromise.then((schema) =>
				generateGraphqlTypes({
					schema,
				})
			),
		]);

		await spawn(
			path.resolve(projectPath, "node_modules", ".bin", "eslint"),
			[...results.reduce<string[]>((res, value) => [...res, ...value], []), "--fix"],
			{
				cwd: projectPath,
				encoding: "utf-8",
			}
		);
	},
};

export default command;
