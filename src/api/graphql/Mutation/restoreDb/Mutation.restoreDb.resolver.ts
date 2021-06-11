import { getUuid } from "@sangonz193/utils/getUuid"
import { fs } from "@sangonz193/utils/node/fs"
import { fsExists } from "@sangonz193/utils/node/fsExists"
import { getMatchingFilePaths } from "@sangonz193/utils/node/getMatchingFilePaths"
import path from "path"
import { spawn } from "promisify-child-process"

import { projectPath } from "../../../../_utils/projectPath"
import { databaseConfig } from "../../../../database/database.config"
import { backupConfig } from "../../../../modules/backup/backup.config"
import { dockerConfig } from "../../../../modules/docker/docker.config"
import { getDbDockerContainerName } from "../../../../modules/docker/getDbDockerContainerName"
import { getUserFromSecret } from "../../_utils/getUserFromSecret"
import { Resolvers } from "../../schemas.types"

const resolver: Resolvers["Mutation"]["restoreDb"] = async (_, args, context) => {
	const { input } = args
	const user = await getUserFromSecret(input.secret, context)
	if (!user) {
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

	const matchingFilePaths = await getMatchingFilePaths(
		path.resolve(backupRepoPath, typeormConfig.database, `${typeormConfig.schema}.*.sql`)
	)

	const mergedBackupContentFilePath = path.resolve(dockerConfig.volumePath, `.${getUuid()}.sql`)
	const backupFileContents = await Promise.all(
		matchingFilePaths.map(async (matchingFilePath) => fs.readFile(matchingFilePath, "utf8"))
	)
	await fs.writeFile(mergedBackupContentFilePath, backupFileContents.join("\n\n"))

	const psqlCommandAuthArgs = [
		...["--dbname", typeormConfig.database],
		...(typeormConfig.host ? ["--host", typeormConfig.host] : []),
		...(typeormConfig.port !== undefined ? ["--port", typeormConfig.port.toString()] : []),
		...(typeormConfig.username ? ["--username", typeormConfig.username] : []),
	]

	const dbContainerName = await getDbDockerContainerName()

	if (!dbContainerName) {
		const message = "Could not get db container name:"
		console.log(message)
		throw new Error(message)
	}

	const tmpEnvFilePath = path.resolve(__dirname, ".tmp", `restoreDb-tmpEnvFile-${getUuid()}`)
	const tmpEnvDirPath = path.resolve(tmpEnvFilePath, "..")

	if (!(await fsExists(tmpEnvDirPath))) {
		await fs.mkdir(tmpEnvDirPath, { recursive: true })
	}

	await fs.writeFile(
		tmpEnvFilePath,
		[["PGPASSWORD", typeormConfig.password]].map(([key, value]) => `${key}="${value}"`).join("\n") + "\n"
	)

	const dockerCommands = ["docker", "exec", "-t", ...["--env-file", tmpEnvFilePath], "--", dbContainerName]

	if (dockerConfig.useSudo) {
		dockerCommands.unshift("sudo")
	}

	if (input.dropSchema) {
		await spawn(
			dockerCommands[0],
			[
				...dockerCommands.slice(1),
				"psql",
				...psqlCommandAuthArgs,
				...["-c", `drop schema if exists "${typeormConfig.schema}" cascade`],
			],
			{
				encoding: "utf8",
			}
		)
		await spawn(
			dockerCommands[0],
			[
				...dockerCommands.slice(1),
				"psql",
				...psqlCommandAuthArgs,
				...["-c", `create schema "${typeormConfig.schema}"`],
			],
			{
				encoding: "utf8",
			}
		)
	}

	await spawn(
		dockerCommands[0],
		[
			...dockerCommands.slice(1),
			"psql",
			...psqlCommandAuthArgs,
			...(input.includeSchema && !input.includeData ? ["--schema-only"] : []),
			...(input.includeData && !input.includeSchema ? ["--data-only"] : []),
			...[
				"-f",
				path.posix.resolve(
					"/var/lib/postgresql/data",
					path.relative(path.resolve(projectPath, "docker", "db-data-gitignore"), mergedBackupContentFilePath)
				),
			],
		],
		{
			encoding: "utf8",
		}
	)
	await fs.unlink(mergedBackupContentFilePath)

	console.log("- restore done.")
}

export default resolver
