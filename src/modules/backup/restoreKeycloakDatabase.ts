import { Pool } from "pg"

import { getTableNames } from "../../database/_utils/getTableNames"
import { keycloakConfig } from "../keycloak/keycloak.config"

export async function restoreKeycloakDatabase() {
	const pool = new Pool({
		database: keycloakConfig.typeormConfig.database,
		host: keycloakConfig.typeormConfig.host,
		password: keycloakConfig.typeormConfig.password,
		port: keycloakConfig.typeormConfig.port,
		user: keycloakConfig.typeormConfig.username,
	})
	const tableNames = await getTableNames(pool, keycloakConfig.typeormConfig.schema)
}
