import { Pool } from "pg"
import { Connection } from "typeorm"

import { databaseConfig } from "../database/database.config"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getDatabasePool(connection: Connection): Promise<Pool> {
	const pool = new Pool(databaseConfig.poolConfig)
	await pool.connect()
	return pool
}
