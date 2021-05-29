import { arrayMapLimit } from "@sangonz193/utils/arrayMapLimit"
import { fs } from "@sangonz193/utils/node/fs"
import { fsExists } from "@sangonz193/utils/node/fsExists"
import path from "path"
import { Client } from "pg"
import { spawn } from "promisify-child-process"
import simpleGit from "simple-git"

import { databaseConfig } from "../../database/database.config"
import { keycloakConfig } from "../keycloak/keycloak.config"
import { backupConfig } from "./backupDb.config"
import { findTableNamesPreparedQuery } from "./findTableNames.sql.generated"

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
	const { database } = config

	if (!database) {
		return
	}

	const backupFolderPath = path.resolve(backupRepoPath, database)
	if (await fsExists(backupFolderPath)) {
		await fs.rmdir(backupFolderPath, { recursive: true })
	}

	if (!(await fsExists(backupRepoPath))) {
		console.log("Folder does not exist:", backupRepoPath)
		return
	}

	const dumpFolderPath = path.resolve(backupRepoPath, config.database)
	if (!(await fsExists(dumpFolderPath))) {
		fs.mkdir(dumpFolderPath, { recursive: true })
	}

	const client = new Client({
		database: config.database,
		host: config.host,
		password: config.password,
		port: config.port,
		user: config.username,
	})
	await client.connect()
	const tables = await findTableNamesPreparedQuery.run({ schema: config.schema }, client).catch((error) => {
		console.log(error)
		client.end()
		throw error
	})

	await spawn(
		"pg_dump",
		[
			...(config.host ? ["-h", config.host] : []),
			...(config.port ? ["--port", config.port.toString()] : []),
			...(config.username ? ["-U", config.username.toString()] : []),
			"--schema-only",
			...["-f", path.resolve(backupRepoPath, database, `${config.schema}.sql`)],
			database,
		],
		{
			cwd: backupRepoPath,
			encoding: "utf8",
			env: {
				...process.env,
				PGPASSWORD: config.password,
			},
		}
	)

	await arrayMapLimit(
		async (index) => {
			const { table_name } = tables[index]

			if (!table_name) {
				return
			}

			await spawn(
				"pg_dump",
				[
					...(config.host ? ["-h", config.host] : []),
					...(config.port ? ["--port", config.port.toString()] : []),
					...(config.username ? ["-U", config.username.toString()] : []),
					...["-t", `"${config.schema}"."${table_name}"`],
					"--data-only",
					...["-f", path.resolve(backupRepoPath, database, `${config.schema}.${table_name}.sql`)],
					database,
				],
				{
					cwd: backupRepoPath,
					encoding: "utf8",
					env: {
						...process.env,
						PGPASSWORD: config.password,
					},
				}
			).catch((e) => {
				console.log(e)
				throw e
			})
		},
		tables.length,
		30
	)

	client.end()
}

process.on("warning", (e) => console.log(e.stack))
