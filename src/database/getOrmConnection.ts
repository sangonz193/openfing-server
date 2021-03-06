import { wait } from "@sangonz193/utils/wait"
import { Connection, createConnection } from "typeorm"

import { databaseConfig } from "./database.config"

export const getOrmConnection = async (): Promise<Connection> => {
	const maxRetries = 15
	let tries = 0
	let connection: Connection | undefined = undefined

	while (!connection && tries < maxRetries) {
		tries++
		connection = await createConnection(databaseConfig.typeormConfig).catch((error) => {
			console.log(error)
			return undefined
		})
		await wait(5000)
	}

	if (!connection) {
		throw new Error(`Could not connect to the database after ${maxRetries} attempts`)
	}

	const { schema } = databaseConfig.typeormConfig
	const schemaExists =
		(await connection.query(`SELECT schema_name FROM information_schema.schemata WHERE schema_name = '${schema}';`))
			.length > 0

	if (!schemaExists) {
		await connection.query(`CREATE SCHEMA ${schema}`)
	}

	return connection
}
