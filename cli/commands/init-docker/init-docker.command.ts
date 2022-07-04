import { wait } from "@sangonz193/utils/wait"
import { Pool, PoolClient } from "pg"
import { spawn } from "promisify-child-process"
import { CommandModule } from "yargs"

import { databasePoolConfig } from "../../../src/database/databasePool.config"
import type { getOrmConnection } from "../../../src/database/getOrmConnection"
import { dockerConfig } from "../../../src/modules/docker/docker.config"
import { generateEntitiesIndex } from "../generate-files/generateEntitiesIndex"

const command: CommandModule<{}, {}> = {
	command: "init-docker",

	describe: "Runs the docker containers for the first time.",

	handler: async () => {
		const generateEntitiesPromise = generateEntitiesIndex()
		await runDbDockerContainer()
		const [pool, client] = await getDatabasePoolAndClient()

		await Promise.all([client.query(`CREATE DATABASE keycloak`), client.query(`CREATE SCHEMA openfing`)])
		await generateEntitiesPromise

		const typeormConnection = await (
			require("../../../src/database/getOrmConnection").getOrmConnection as typeof getOrmConnection
		)()
		await typeormConnection.runMigrations()

		client.release()
		await pool.end()
		await stopDbDockerContainer()
	},
}

export default command

async function runDbDockerContainer() {
	const dockerArgs = ["docker-compose", "up", "-d", "db"]
	if (dockerConfig.useSudo) {
		dockerArgs.unshift("sudo")
	}

	await spawn(dockerArgs[0], dockerArgs.slice(1), { encoding: "utf8" })
}

async function stopDbDockerContainer() {
	const dockerArgs = ["docker-compose", "down"]
	if (dockerConfig.useSudo) {
		dockerArgs.unshift("sudo")
	}

	await spawn(dockerArgs[0], dockerArgs.slice(1), { encoding: "utf8" })
}

async function getDatabasePoolAndClient() {
	const pool = new Pool(databasePoolConfig)
	let connectionError: unknown
	const getClient = () =>
		pool.connect().catch((error) => {
			connectionError = error
			return null
		})

	const maxRetries = 5
	let retries = 0
	let client: PoolClient | null = null
	await wait(5000)
	while (retries < maxRetries && !(client = await getClient())) {
		await wait(5000)
		retries++
	}

	if (!client) {
		throw connectionError
	}

	return [pool, client] as const
}
