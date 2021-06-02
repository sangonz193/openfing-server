import { arrayMapLimit } from "@sangonz193/utils/arrayMapLimit"
import { getUuid } from "@sangonz193/utils/getUuid"
import { _fs, fs } from "@sangonz193/utils/node/fs"
import { fsExists } from "@sangonz193/utils/node/fsExists"
import path from "path"
import { Pool } from "pg"
import { spawn } from "promisify-child-process"
import simpleGit from "simple-git"

import { databaseConfig } from "../../database/database.config"
import { getTableNames } from "../../database/Tables/getTableNames"
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

	await dumpDatabase(databaseConfig.typeormConfig, backupRepoPath)
	await dumpDatabase(keycloakConfig.typeormConfig, backupRepoPath)

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

async function dumpDatabase(config: typeof databaseConfig.typeormConfig, backupRepoPath: string) {
	const backupFolderPath = path.resolve(backupRepoPath, config.database)
	if (await fsExists(backupFolderPath)) {
		await fs.rmdir(backupFolderPath, { recursive: true })
	}

	if (!(await fsExists(backupRepoPath))) {
		console.log("Folder does not exist:", backupRepoPath)
		return
	}

	if (!(await fsExists(backupFolderPath))) {
		await fs.mkdir(backupFolderPath, { recursive: true })
	}

	const pool = new Pool({
		database: config.database,
		host: config.host,
		password: config.password,
		port: config.port,
		user: config.username,
	})
	await pool.connect()
	const tables = await getTableNames(pool, config.schema).catch((error) => {
		console.log(error)
		pool.end()
		throw error
	})

	const pgDumpAuthArgs = [
		...(config.host ? ["-h", config.host] : []),
		...(config.port ? ["--port", config.port.toString()] : []),
		...(config.username ? ["-U", config.username.toString()] : []),
	]

	const dbContainerName = await getDbDockerContainerName()

	if (!dbContainerName) {
		const message = "Could not get db container name:"
		console.log(message)
		pool.end()
		throw new Error(message)
	}

	const tmpEnvFilePath = path.resolve(__dirname, ".tmp", `backupDb-tmpEnvFile-${getUuid()}`)
	const tmpEnvDirPath = path.resolve(tmpEnvFilePath, "..")

	if (!(await fsExists(tmpEnvDirPath))) {
		await fs.mkdir(tmpEnvDirPath, { recursive: true })
	}

	await fs.writeFile(
		tmpEnvFilePath,
		[["PGPASSWORD", config.password]].map(([key, value]) => `${key}="${value}"`).join("\n") + "\n"
	)

	const dockerCommands = ["docker"]
	if (dockerConfig.useSudo) {
		dockerCommands.unshift("sudo")
	}

	const dumpSpawnPromise = spawn(
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
			encoding: "utf8",
		}
	)
	const dumpOutputStream = dumpSpawnPromise.stdout

	const databaseSchemaSqlFilePath = path.resolve(backupFolderPath, `${config.schema}.sql`)
	dumpOutputStream?.pipe(_fs.createWriteStream(databaseSchemaSqlFilePath))
	await dumpSpawnPromise

	await arrayMapLimit(
		async (index) => {
			const tableName = tables[index]

			try {
				const childProcessPromise = spawn(
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
						encoding: "utf8",
					}
				)

				const content = (await childProcessPromise).stdout as string
				await fs.writeFile(path.resolve(backupFolderPath, `${config.schema}.${tableName}.sql`), content)
			} catch (e: unknown) {
				console.log(e)
				throw e
			}
		},
		tables.length,
		30
	)

	await fs.unlink(tmpEnvFilePath)

	await pool.end()
}
