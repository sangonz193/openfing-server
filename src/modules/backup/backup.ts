import { arrayMapLimit } from "@sangonz193/utils/arrayMapLimit"
import { fsExists } from "@sangonz193/utils/node/fsExists"
import simpleGit from "simple-git"

import { getDbDockerContainerName } from "../docker/getDbDockerContainerName"
import { backupConfig } from "./backup.config"
import { backupTableData } from "./backupTableData"
import { databaseConfigs } from "./databaseConfigs"
import { getBackupDatabaseConfig } from "./getBackupDatabaseConfig"

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

	const backupDbConfigs = await Promise.all(
		databaseConfigs.map((config) =>
			getBackupDatabaseConfig({
				backupRepoPath,
				config: config,
				dbContainerName: dbContainerName,
			})
		)
	)

	const backupTableOptionsList = backupDbConfigs.map((backupDbConfig) => backupDbConfig.backupTableOptionsList).flat()

	try {
		await arrayMapLimit(
			async (index) => {
				const options = backupTableOptionsList[index]
				await backupTableData(options)
			},
			backupTableOptionsList.length,
			backupTableOptionsList.length
		)
	} catch (error: unknown) {
		console.log(error)
		backupDbConfigs.forEach((config) => config.cleanUp())
		throw error
	}

	await Promise.all(backupDbConfigs.map((config) => config.cleanUp()))

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
