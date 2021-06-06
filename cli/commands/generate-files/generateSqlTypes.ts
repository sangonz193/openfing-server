import { fs } from "@sangonz193/utils/node/fs"
import chalk from "chalk"
import path from "path"
import { spawn } from "promisify-child-process"
import * as zg from "zapatos/generate"

import { projectPath } from "../../../src/_utils/projectPath"
import type { databasePoolConfig } from "../../../src/database/databasePool.config"

export async function generateSqlTypes() {
	const zapatosOutDirOption = path.resolve(projectPath, "src", "database")
	const outExt = ".generated.d.ts"
	try {
		await zg.generate({
			db: require("../../../src/database/databasePool.config").databasePoolConfig as typeof databasePoolConfig,
			outDir: zapatosOutDirOption,
			outExt: outExt,
			schemas: {
				openfing: {
					include: "*",
					exclude: [],
				},
			},
			schemaJSDoc: true,
		})
	} catch (error: unknown) {
		console.log(chalk.red(`Could not generate SQL types.`), error)
		return
	}

	const generatedEslintIgnoreFilePath = path.resolve(zapatosOutDirOption, "zapatos", ".eslintrc.json")
	await fs.unlink(generatedEslintIgnoreFilePath)

	await spawn("npx", ["eslint", path.resolve(zapatosOutDirOption, "zapatos", "**", `*${outExt}`), "--fix"], {
		cwd: projectPath,
	}).catch(() => null)
}
