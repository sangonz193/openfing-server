import { ExpressContext } from "apollo-server-express"
import KeycloakAdminClient from "keycloak-admin"
import KeycloakConnect from "keycloak-connect"
import { Pool } from "pg"
import { Connection } from "typeorm"

import { Repositories } from "../database/repositories"
import { UserRow } from "../database/User"
import { DataLoaders } from "../dataloaders"

export type RequestContext = ExpressContext & {
	ormConnection: Connection
	includeHidden?: boolean
	user?: UserRow
	pool: Pool

	dataLoaders: DataLoaders
	repositories: Repositories
	keycloakAdminClient: { current: KeycloakAdminClient }
	keycloakConnect: KeycloakConnect.Keycloak
}
