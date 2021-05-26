import { fs } from "@sangonz193/utils/node/fs"
import { fsExists } from "@sangonz193/utils/node/fsExists"
import path from "path"
import { spawn } from "promisify-child-process"
import simpleGit from "simple-git"

import { databaseConfig } from "../../database/database.config"
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

	await spawn(
		"pg_dump",
		[
			...(config.host ? ["-h", config.host] : []),
			...(config.port ? ["--port", config.port.toString()] : []),
			...(config.username ? ["-U", config.username.toString()] : []),
			...["-Fd", "-f", database],
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
}
