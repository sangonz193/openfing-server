import { fs } from "@sangonz193/utils/node/fs"
import path from "path"
import { spawn } from "promisify-child-process"

import { databaseConfig } from "../../database/database.config"
import { dockerConfig } from "../docker/docker.config"
import { getPgDumpAuthArgs } from "./getPgDumpAuthArgs"

export type BackupTableOptions = {
	config: typeof databaseConfig.typeormConfig
	tableName: string
	dbBackupFolderPath: string
	dbContainerName: string
	tmpEnvFilePath: string
}

export async function backupTableData({
	config,
	tableName,
	dbBackupFolderPath,
	dbContainerName,
	tmpEnvFilePath,
}: BackupTableOptions) {
	const pgDumpAuthArgs = getPgDumpAuthArgs(config)
	const dockerCommands = ["docker"]
	if (dockerConfig.useSudo) {
		dockerCommands.unshift("sudo")
	}

	const tableDumpFileName = `${config.schema}.${tableName}.sql`
	const tmpTableDumpFilePath = path.resolve(dockerConfig.volumePath, tableDumpFileName)
	const tmpTableDumpFilePathFromContainer = path.resolve(dockerConfig.volumePathFromContainer, tableDumpFileName)
	await spawn(
		dockerCommands[0],
		[
			...dockerCommands.slice(1),
			"exec",
			"-t",
			...["--env-file", tmpEnvFilePath],
			"--",
			dbContainerName,
			"pg_dump",
			...pgDumpAuthArgs,
			...["-t", `"${config.schema}"."${tableName}"`],
			"--data-only",
			config.database,
			...["-f", tmpTableDumpFilePathFromContainer],
		],
		{
			cwd: path.resolve(dbBackupFolderPath, ".."),
			encoding: "utf8",
			stdio: "inherit",
		}
	)

	const tableDumpFilePath = path.resolve(dbBackupFolderPath, tableDumpFileName)
	await spawn("sudo", ["chmod", "775", tmpTableDumpFilePath], {
		encoding: "utf8",
		stdio: "inherit",
	})
	await fs.rename(tmpTableDumpFilePath, tableDumpFilePath)
}
