import { Pool } from "pg"

import { databaseConfig } from "../database/database.config"
import { getOrmConnection } from "../database/getOrmConnection"
import { getRepositories } from "../database/repositories"
import { getKeycloakAdminClientRef } from "../keycloak/getKeycloakAdminClientRef"
import { getKeycloakConnect } from "../keycloak/getKeycloakConnect"
import { RequestContext } from "./RequestContext"

export type SharedContext = Pick<
	RequestContext,
	"ormConnection" | "pool" | "repositories" | "keycloakAdminClient" | "keycloakConnect"
>

export async function getSharedContext(): Promise<SharedContext> {
	const ormConnectionPromise = getOrmConnection()
	const keycloakAdminClientRefPromise = getKeycloakAdminClientRef()
	const [ormConnection, keycloakAdminClient, keycloakConnect] = await Promise.all([
		ormConnectionPromise.then(async (connection) => {
			await connection.runMigrations()
			return connection
		}),
		getKeycloakAdminClientRef(),
		keycloakAdminClientRefPromise.then(() => getKeycloakConnect()),
	])

	const pool = new Pool(databaseConfig.poolConfig)
	const repositories = getRepositories(ormConnection, pool)

	return {
		keycloakAdminClient: keycloakAdminClient,
		keycloakConnect: keycloakConnect,
		ormConnection: ormConnection,
		pool: pool,
		repositories: repositories,
	}
}
