import { _fs, fs } from "@sangonz193/utils/node/fs"
import { fsExists } from "@sangonz193/utils/node/fsExists"
import { spawn } from "child_process"
import path from "path"
import simpleGit from "simple-git"

import { dockerConfig } from "../docker/docker.config"
import { getDbDockerContainerName } from "../docker/getDbDockerContainerName"
import { backupConfig } from "./backup.config"
import { databaseConfigs } from "./databaseConfigs"
import { getPgDumpAuthArgs } from "./getPgDumpAuthArgs"
import { writeTmpEnvFile } from "./writeTmpEnvFile"

export const backup = async () => {
	const { backupRepoPath } = backupConfig

	if (!backupRepoPath || !backupConfig.enabled) {
		console.log("skipping backup")
		return
	}

	if (!(await fsExists(backupRepoPath))) {
		console.log("Folder does not exist:", backupRepoPath)
		return
	}

	const dbContainerName = await getDbDockerContainerName()
	if (!dbContainerName) {
		const message = "Could not get db container name:"
		console.log(message)
		throw new Error(message)
	}

	for (const config of databaseConfigs) {
		const tmpEnvFilePath = await writeTmpEnvFile(config)
		const dockerCommands = ["docker", "exec", "-t", ...["--env-file", tmpEnvFilePath], "--", dbContainerName]

		if (dockerConfig.useSudo) {
			dockerCommands.unshift("sudo")
		}

		const writeStream = _fs.createWriteStream(path.resolve(backupRepoPath, `${config.database}.sql`))
		const pgDump = spawn(
			dockerCommands[0],
			[...dockerCommands.slice(1), "pg_dump", ...getPgDumpAuthArgs(config), config.database],
			{}
		)

		pgDump.stdout?.pipe(writeStream)
		await new Promise((resolve, reject) => {
			pgDump.on("error", reject)
			pgDump.on("close", resolve)
		})
		await fs.unlink(tmpEnvFilePath)
		console.log("done")
	}

	const git = simpleGit({
		baseDir: backupRepoPath,
	})

	const status = await git.status()

	if (!status.isClean()) {
		await git.add(["--all", "."])
		await git.commit("backup")
		await git.push()
	} else {
		console.log("No changes detected, won't backup")
	}
}
