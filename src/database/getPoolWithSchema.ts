import { Pool } from "pg"

import { databaseConfig } from "./database.config"

export async function getPoolWithSchema() {
	const pool = new Pool(databaseConfig.poolConfig)
	await pool.query(
		`ALTER DATABASE "${databaseConfig.poolConfig.database}" SET "search_path" TO "$user", "public", "${databaseConfig.typeormConfig.schema}";`
	)

	return pool
}
