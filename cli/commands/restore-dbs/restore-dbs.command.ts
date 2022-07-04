import { fs } from "@sangonz193/utils/node/fs"
import { spawn } from "child_process"
import debounce from "lodash/debounce"
import path from "path"
import { spawn as spawnAsync } from "promisify-child-process"
import { CommandModule } from "yargs"

import { databaseConfig } from "../../../src/database/database.config"
import { backupConfig } from "../../../src/modules/backup/backup.config"
import { dockerConfig } from "../../../src/modules/docker/docker.config"
import { projectPath } from "../../_utils/projectPath"

const command: CommandModule<{}, {}> = {
	command: "restore-dbs",

	describe: "Restores the databases with the values in current backup folder.",

	handler: async () => {
		if (!backupConfig.backupRepoPath) {
			console.log(`backupRepoPath not specified.`)
			return
		}
		const { backupRepoPath } = backupConfig

		await dockerComposeDown()

		const dbContainerVolumePath = path.resolve(projectPath, "docker", "db-data-gitignore")
		await fs.rm(dbContainerVolumePath, { recursive: true, force: true })

		const initSqlDirPath = path.resolve(projectPath, "docker", "init-sql")
		await fs.rm(initSqlDirPath, { recursive: true, force: true })
		await fs.mkdir(initSqlDirPath, { recursive: true })

		for (const dbName of ["keycloak", databaseConfig.typeormConfig.database]) {
			const initSqlFilePath = path.resolve(initSqlDirPath, `${dbName}.sql`)
			const backupFilePath = path.resolve(backupRepoPath, `${dbName}.sql`)

			if (dbName !== databaseConfig.typeormConfig.database) {
				await fs.copyFile(backupFilePath, initSqlFilePath + "_")
				await fs.writeFile(initSqlFilePath, `CREATE DATABASE ${dbName};\n` + `\\c ${dbName};\n`)
				await fs.appendFile(initSqlFilePath, await fs.readFile(initSqlFilePath + "_"))
				await fs.unlink(initSqlFilePath + "_")
			} else {
				await fs.copyFile(backupFilePath, initSqlFilePath)
			}
		}

		const upSpawn = spawn(
			dockerConfig.useSudo ? "sudo" : "docker-compose",
			[...(dockerConfig.useSudo ? ["docker-compose"] : []), "up", "db"],
			{}
		)

		console.log(`running up`)
		await new Promise((resolve) => {
			const resolveDebounce = debounce(resolve, 10000)
			upSpawn.stdout.on("data", (message) => {
				process.stdout.write(message instanceof Buffer ? message.toString() : message)
				resolveDebounce(undefined)
			})
		})
		console.log(`running compose down`)
		await dockerComposeDown()
		await fs.rm(initSqlDirPath, { recursive: true, force: true })
		console.log(`done.`)
	},
}

function dockerComposeDown() {
	return spawnAsync(
		dockerConfig.useSudo ? "sudo" : "docker-compose",
		[...(dockerConfig.useSudo ? ["docker-compose"] : []), "down"],
		{
			cwd: projectPath,
			stdio: "inherit",
		}
	)
}

export default command
