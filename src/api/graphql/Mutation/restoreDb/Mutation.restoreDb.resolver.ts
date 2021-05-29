import { getUuid } from "@sangonz193/utils/getUuid"
import { fs } from "@sangonz193/utils/node/fs"
import { fsExists } from "@sangonz193/utils/node/fsExists"
import { getMatchingFilePaths } from "@sangonz193/utils/node/getMatchingFilePaths"
import path from "path"
import { spawn } from "promisify-child-process"

import { databaseConfig } from "../../../../database/database.config"
import { backupConfig } from "../../../../modules/backup-db/backupDb.config"
import { getUserFromSecret } from "../../_utils/getUserFromSecret"
import { Resolvers } from "../../schemas.types"

const resolver: Resolvers["Mutation"]["restoreDb"] = async (_, args, context) => {
	const { input } = args
	const user = await getUserFromSecret(input.secret, context)
	if (!user) {
		console.log(1)
		throw new Error("Unauthenticated")
	}

	if (!input.includeData && !input.includeSchema) {
		console.log(2)
		throw new Error("Invalid input: `includeSchema` and `includeData` cannot be false at the same time.")
	}

	if (input.dropSchema && !input.includeSchema) {
		const uuid = getUuid()
		console.log(uuid, "Configuration `includeSchema: false` and `dropSchema: true` is conflictive.")
		throw new Error(uuid)
	}

	const { typeormConfig } = databaseConfig
	const { backupRepoPath } = backupConfig
	if (!backupRepoPath) {
		const uuid = getUuid()
		console.log(uuid, "backupRepoPath is not defined.")
		throw new Error(uuid)
	}

	const tmpDirPath = path.resolve(__dirname, ".tmp")
	if (!(await fsExists(tmpDirPath))) {
		await fs.mkdir(tmpDirPath)
	}

	const databaseSchemaFilePath = path.resolve(backupRepoPath, typeormConfig.database, typeormConfig.schema + ".sql")

	if (!(await fsExists(databaseSchemaFilePath))) {
		const uuid = getUuid()
		console.log(uuid, "databaseSchemaFilePath does not exist:", databaseSchemaFilePath)
		throw new Error(uuid)
	}

	const matchingFilePaths = await getMatchingFilePaths(
		path.resolve(backupRepoPath, typeormConfig.database, `${typeormConfig.schema}.*.sql`)
	)
	matchingFilePaths.unshift(databaseSchemaFilePath)

	const mergedBackupContentFilePath = path.resolve(tmpDirPath, `.${getUuid()}.sql`)
	const backupFileContents = await Promise.all(
		matchingFilePaths.map(async (matchingFilePath) => fs.readFile(matchingFilePath, "utf8"))
	)
	await fs.writeFile(mergedBackupContentFilePath, backupFileContents.join("\n\n"))

	const psqlCommandAuthParams = [
		...["--dbname", typeormConfig.database],
		...(typeormConfig.host ? ["--host", typeormConfig.host] : []),
		...(typeormConfig.port !== undefined ? ["--port", typeormConfig.port.toString()] : []),
		...(typeormConfig.username ? ["--username", typeormConfig.username] : []),
	]
	const spawnEnvWithDbPassword = {
		...process.env,
		PGPASSWORD: typeormConfig.password,
	}

	if (input.dropSchema) {
		await spawn(
			"psql",
			[...psqlCommandAuthParams, ...["-c", `drop schema if exists "${typeormConfig.schema}" cascade`]],
			{
				encoding: "utf8",
				env: spawnEnvWithDbPassword,
			}
		)
		await spawn("psql", [...psqlCommandAuthParams, ...["-c", `create schema "${typeormConfig.schema}"`]], {
			encoding: "utf8",
			env: spawnEnvWithDbPassword,
		})
	}

	await spawn(
		"psql",
		[
			...psqlCommandAuthParams,
			...(input.includeSchema && !input.includeData ? ["--schema-only"] : []),
			...(input.includeData && !input.includeSchema ? ["--data-only"] : []),
			...["-f", mergedBackupContentFilePath],
		],
		{
			encoding: "utf8",
			env: spawnEnvWithDbPassword,
		}
	)
	await fs.unlink(mergedBackupContentFilePath)

	console.log("- restore done.")
}

export default resolver
