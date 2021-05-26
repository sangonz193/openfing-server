import { Request, Response } from "express"
import KeycloakAdminClient from "keycloak-admin"
import KeycloakConnect from "keycloak-connect"
import { Connection } from "typeorm"

import { Repositories } from "../database/repositories"
import { UserRow } from "../database/User"
import { DataLoaders } from "../dataloaders"

export type RequestContext = {
	ormConnection: Connection
	req: Request
	res: Response
	includeHidden?: boolean
	user?: UserRow

	dataLoaders: DataLoaders
	repositories: Repositories
	keycloakAdminClientRef: { current: KeycloakAdminClient }
	keycloakConnect: KeycloakConnect.Keycloak
}
