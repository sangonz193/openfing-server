import { wait } from "@sangonz193/utils/wait"
import { Connection, createConnection } from "typeorm"

import { databaseConfig } from "./database.config"

export const getOrmConnection = async (): Promise<Connection> => {
	const maxRetries = 3
	let tries = 0
	let connection: Connection | undefined = undefined

	while (!connection && tries < maxRetries) {
		tries++
		connection = await createConnection(databaseConfig.typeormConfig).catch(async (error) => {
			console.log(error)
			await wait(5000)
			return undefined
		})
	}

	if (!connection) {
		throw new Error(`Could not connect to the database after ${maxRetries} attempts`)
	}

	return connection
}
