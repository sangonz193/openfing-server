import "core-js/stable"
import "moment-timezone"
import "reflect-metadata"
import "regenerator-runtime/runtime"
import "./_utils/configEnv"

import cors from "cors"
import express from "express"

import { registerApolloServer } from "./api/graphql/registerApolloServer"
import { registerRestEndpoints } from "./api/rest/registerRestEndpoints"
import { testPublicUrl } from "./api/rest/testPublicUrl"
import { appConfig } from "./config/app.config"
import { getOrmConnection } from "./database/getOrmConnection"
import { getRepositories } from "./database/repositories"
import { getKeycloakAdminClientRef } from "./modules/keycloak/getKeycloakAdminClientRef"
import { getKeycloakConnect } from "./modules/keycloak/getKeycloakConnect"

const run = async () => {
	const [ormConnection, keycloakAdminClientRef, keycloakConnect] = await Promise.all([
		getOrmConnection().then(async (connection) => {
			await connection.runMigrations()
			return connection
		}),
		getKeycloakAdminClientRef(),
		getKeycloakConnect(),
	])

	const expressApp = express()
	const repositories = getRepositories(ormConnection)

	expressApp.use(cors())
	registerApolloServer({
		expressApp,
		keycloakAdminClientRef,
		ormConnection,
		repositories,
		keycloakConnect,
	})
	registerRestEndpoints({
		expressApp,
		keycloakAdminClientRef,
		ormConnection,
		repositories,
		keycloakConnect,
	})

	const server = expressApp.listen(
		{
			port: appConfig.port,
			host: appConfig.host,
		},
		async () => {
			console.log(`Listening on port ${appConfig.port.toString()} with cors enabled`)
			testPublicUrl()
		}
	)

	server.addListener("error", (error) => {
		console.error(error)

		process.exit(1)
	})
}

run().catch((error) => {
	console.error(error)

	process.exit(1)
})
