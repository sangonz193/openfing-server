import { Pool } from "pg"

import { getKeycloakAdminClientRef } from "../authentication/keycloak/getKeycloakAdminClientRef"
import { getKeycloakConnect } from "../authentication/keycloak/getKeycloakConnect"
import { databaseConfig } from "../database/database.config"
import { getOrmConnection } from "../database/getOrmConnection"
import { getRepositories } from "../database/repositories"
import { RequestContext } from "./RequestContext"

export type SharedContext = Pick<
	RequestContext,
	"ormConnection" | "pool" | "repositories" | "keycloakAdminClient" | "keycloakConnect"
>

export async function getSharedContext(): Promise<SharedContext> {
	const ormConnectionPromise = getOrmConnection()
	const keycloakAdminClientRefPromise = getKeycloakAdminClientRef()
	const [ormConnection, keycloakAdminClient, keycloakConnect] = await Promise.all([
		ormConnectionPromise,
		keycloakAdminClientRefPromise,
		keycloakAdminClientRefPromise.then((ref) => getKeycloakConnect(ref, ref.secret)),
	]).catch((error) => {
		console.log(error)
		ormConnectionPromise.then((ormConnection) => ormConnection.close())
		throw error
	})

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
