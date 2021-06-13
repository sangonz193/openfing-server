import { fs } from "@sangonz193/utils/node/fs"
import { fsExists } from "@sangonz193/utils/node/fsExists"
import path from "path"
import { Pool } from "pg"

import { getTableNames } from "../../database/_utils/getTableNames"
import { databaseConfig } from "../../database/database.config"
import { BackupTableOptions } from "./backupTableData"
import { writeTmpEnvFile } from "./writeTmpEnvFile"

export type GetBackupTableOptionsListOptions = {
	config: typeof databaseConfig.typeormConfig
	backupRepoPath: string
	dbContainerName: string
}

export type BackupDatabaseConfig = {
	cleanUp: () => Promise<void>
	backupTableOptionsList: BackupTableOptions[]
	dbBackupFolderPath: string
	tmpEnvFilePath: string
}

export async function getBackupDatabaseConfig({
	config,
	backupRepoPath,
	dbContainerName,
}: GetBackupTableOptionsListOptions): Promise<BackupDatabaseConfig> {
	const pool = new Pool({
		database: config.database,
		host: config.host,
		password: config.password,
		port: config.port,
		user: config.username,
	})
	const dbBackupFolderPath = path.resolve(backupRepoPath, config.database)

	const [tableNames, tmpEnvFilePath] = await Promise.all([
		getTableNames(pool, config.schema).catch((error) => {
			console.log(error)
			pool.end()
			throw error
		}),
		writeTmpEnvFile(databaseConfig.typeormConfig),
		fsExists(dbBackupFolderPath)
			.then((exists) => {
				if (!exists) {
					return undefined
				}
				return fs.rmdir(dbBackupFolderPath, { recursive: true })
			})
			.then(() => {
				return fs.mkdir(dbBackupFolderPath, { recursive: true })
			}),
	])

	return {
		backupTableOptionsList: tableNames.map((tableName) => ({
			dbBackupFolderPath: dbBackupFolderPath,
			config: config,
			tableName: tableName,
			dbContainerName: dbContainerName,
			tmpEnvFilePath: tmpEnvFilePath,
		})),

		tmpEnvFilePath,

		dbBackupFolderPath,

		cleanUp: async () => {
			await Promise.all([fs.unlink(tmpEnvFilePath), pool.end()])
		},
	}
}
