import { ExpressContext } from "apollo-server-express"
import KeycloakAdminClient from "keycloak-admin"
import KeycloakConnect from "keycloak-connect"
import { Pool } from "pg"
import { Connection } from "typeorm"

import { UserInfo } from "../authentication/keycloak/UserInfo"
import { Repositories } from "../database/repositories"
import { DataLoaders } from "../dataloaders"

export type RequestContext = ExpressContext & {
	ormConnection: Connection
	includeHidden?: boolean
	user?: UserInfo
	pool: Pool

	dataLoaders: DataLoaders
	repositories: Repositories
	keycloakAdminClient: { current: KeycloakAdminClient }
	keycloakConnect: KeycloakConnect.Keycloak
}
