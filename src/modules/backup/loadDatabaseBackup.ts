import { getUuid } from "@sangonz193/utils/getUuid"
import { fs } from "@sangonz193/utils/node/fs"
import { getMatchingFilePaths } from "@sangonz193/utils/node/getMatchingFilePaths"
import path from "path"
import { spawn } from "promisify-child-process"

import type { databaseConfig } from "../../database/database.config"
import { dockerConfig } from "../docker/docker.config"
import { getDbDockerContainerName } from "../docker/getDbDockerContainerName"
import { backupConfig } from "./backup.config"
import { getPgDumpAuthArgs } from "./getPgDumpAuthArgs"
import { writeTmpEnvFile } from "./writeTmpEnvFile"

export type LoadDatabaseBackupOptions = {
	config: typeof databaseConfig.typeormConfig
}

export async function loadDatabaseBackup({ config }: LoadDatabaseBackupOptions): Promise<boolean> {
	const { backupRepoPath } = backupConfig
	if (!backupRepoPath) {
		console.log("backupRepoPath is not defined.")
		return false
	}

	const dbContainerName = await getDbDockerContainerName()
	if (!dbContainerName) {
		const message = "Could not get db container name:"
		console.log(message)
		throw new Error(message)
	}

	const matchingFilePaths = await getMatchingFilePaths(
		path.resolve(backupRepoPath, config.database, `${config.schema}.*.sql`)
	)

	const mergedBackupContentFilePath = path.resolve(dockerConfig.volumePath, `${config.database}-${getUuid()}.sql`)
	await spawn("sudo", ["chmod", "775", path.resolve(mergedBackupContentFilePath, "..")], {
		encoding: "utf8",
		stdio: "inherit",
	})

	await fs.writeFile(mergedBackupContentFilePath, "")

	for (const matchingFilePath of matchingFilePaths) {
		await fs.appendFile(mergedBackupContentFilePath, `\n` + (await fs.readFile(matchingFilePath, "utf8")))
	}

	const pgDumpAuthArgs = getPgDumpAuthArgs(config)
	const tmpEnvFilePath = await writeTmpEnvFile(config)
	const dockerCommands = ["docker", "exec", "-t", ...["--env-file", tmpEnvFilePath], "--", dbContainerName]

	if (dockerConfig.useSudo) {
		dockerCommands.unshift("sudo")
	}

	await spawn(
		dockerCommands[0],
		[
			...dockerCommands.slice(1),
			"psql",
			...pgDumpAuthArgs,
			...["--dbname", config.database],
			...["-c", `create schema if not exists "${config.schema}"`],
		],
		{
			encoding: "utf8",
			stdio: "inherit",
		}
	)

	await spawn(
		dockerCommands[0],
		[
			...dockerCommands.slice(1),
			"psql",
			...pgDumpAuthArgs,
			...["--dbname", config.database],
			...[
				"-f",
				path.posix.resolve(
					dockerConfig.volumePathFromContainer,
					path.relative(dockerConfig.volumePath, mergedBackupContentFilePath)
				),
			],
		],
		{
			encoding: "utf8",
			stdio: "inherit",
		}
	)

	await Promise.all([fs.unlink(mergedBackupContentFilePath), fs.unlink(tmpEnvFilePath)])

	console.log("- restore done.")
	return true
}
