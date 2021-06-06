import { arrayMapLimit } from "@sangonz193/utils/arrayMapLimit"
import { getUuid } from "@sangonz193/utils/getUuid"
import { _fs, fs } from "@sangonz193/utils/node/fs"
import { fsExists } from "@sangonz193/utils/node/fsExists"
import { spawn } from "child_process"
import path from "path"
import { Pool } from "pg"
import simpleGit from "simple-git"

import { projectPath } from "../../_utils/projectPath"
import { getTableNames } from "../../database/_utils/getTableNames"
import { databaseConfig } from "../../database/database.config"
import { dockerConfig } from "../docker/docker.config"
import { getDbDockerContainerName } from "../docker/getDbDockerContainerName"
import { keycloakConfig } from "../keycloak/keycloak.config"
import { backupConfig } from "./backupDb.config"

export const backupDb = async () => {
	const { backupRepoPath } = backupConfig

	if (!backupRepoPath || !backupConfig.enabled) {
		console.log("skipping backup")
		return
	}

	if (!(await fsExists(backupRepoPath))) {
		console.log("Folder does not exist:", backupRepoPath)
		return
	}

	const [databasePoolAndTableNames, keycloakPoolAndTableNames, dbContainerName] = await Promise.all([
		await getPoolAndTableNames(databaseConfig.typeormConfig, backupRepoPath),
		await getPoolAndTableNames(keycloakConfig.typeormConfig, backupRepoPath),
		getDbDockerContainerName(),
	])

	if (!dbContainerName) {
		const message = "Could not get db container name:"
		console.log(message)
		databasePoolAndTableNames.pool.end()
		keycloakPoolAndTableNames.pool.end()
		throw new Error(message)
	}

	await arrayMapLimit(
		async (index) => {
			if (index < databasePoolAndTableNames.tableNames.length) {
				await dumpTable({
					...databasePoolAndTableNames,
					tableName: databasePoolAndTableNames.tableNames[index],
					backupRepoPath: backupRepoPath,
					config: databaseConfig.typeormConfig,
					dbContainerName: dbContainerName,
				})
			} else {
				await dumpTable({
					...keycloakPoolAndTableNames,
					tableName: keycloakPoolAndTableNames.tableNames[index],
					backupRepoPath: backupRepoPath,
					config: keycloakConfig.typeormConfig,
					dbContainerName: dbContainerName,
				})
			}
		},
		databasePoolAndTableNames.tableNames.length + keycloakPoolAndTableNames.tableNames.length,
		5
	)

	const git = simpleGit({
		baseDir: backupRepoPath,
	})

	const status = await git.status()

	if (!status.isClean()) {
		await git.add(".")
		await git.commit("backup")
		await git.push()
	} else {
		console.log("No changes detected, won't backup")
	}
}

async function dumpTable(options: {
	config: typeof databaseConfig.typeormConfig
	pool: Pool
	tableName: string
	backupRepoPath: string
	backupFolderPath: string
	dbContainerName: string
}) {
	const { config, pool, tableName, backupRepoPath, backupFolderPath, dbContainerName } = options

	// represents the connection from inside the docker container.
	const pgDumpAuthArgs = [
		...["-h", "localhost"],
		...["--port", "5432"],
		...(config.username ? ["-U", config.username.toString()] : []),
	]

	const tmpEnvFilePath = path.resolve(__dirname, `backupDb-tmpEnvFile-${getUuid()}`)
	await fs.writeFile(
		tmpEnvFilePath,
		[["PGPASSWORD", config.password]].map(([key, value]) => `${key}="${value}"`).join("\n") + "\n"
	)

	const dockerCommands = ["docker"]
	if (dockerConfig.useSudo) {
		dockerCommands.unshift("sudo")
	}

	const dumpSpawn = spawn(
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
			"--schema-only",
			config.database,
		],
		{
			cwd: projectPath,
		}
	)

	const databaseSchemaSqlFilePath = path.resolve(backupFolderPath, `${config.schema}.sql`)
	dumpSpawn.stdout.pipe(_fs.createWriteStream(databaseSchemaSqlFilePath))
	await new Promise((resolve, reject) => {
		dumpSpawn.on("exit", resolve)
		dumpSpawn.on("error", reject)
	})

	try {
		const childProcess = spawn(
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
			],
			{
				cwd: backupRepoPath,
			}
		)

		childProcess.stdout.pipe(
			_fs.createWriteStream(path.resolve(backupFolderPath, `${config.schema}.${tableName}.sql`))
		)
		await new Promise((resolve, reject) => {
			childProcess.on("exit", resolve)
			childProcess.on("error", reject)
		})
	} catch (e: unknown) {
		console.log(e)
		await pool.end()
		await fs.unlink(tmpEnvFilePath)
		throw e
	}

	await fs.unlink(tmpEnvFilePath)
}

async function getPoolAndTableNames(
	config: typeof databaseConfig.typeormConfig,
	backupRepoPath: string
): Promise<{ pool: Pool; tableNames: string[]; backupFolderPath: string }> {
	const pool = new Pool({
		database: config.database,
		host: config.host,
		password: config.password,
		port: config.port,
		user: config.username,
	})

	const backupFolderPath = path.resolve(backupRepoPath, config.database)
	const [tableNames] = await Promise.all([
		getTableNames(pool, config.schema).catch((error) => {
			console.log(error)
			pool.end()
			throw error
		}),
		fsExists(backupFolderPath)
			.then((exists) => {
				if (!exists) {
					return undefined
				}
				return fs.rmdir(backupFolderPath, { recursive: true })
			})
			.then(() => {
				return fs.mkdir(backupFolderPath, { recursive: true })
			}),
	])

	return {
		pool: pool,
		tableNames: tableNames,
		backupFolderPath: backupFolderPath,
	}
}
