import "core-js/stable"
import "moment-timezone"
import "reflect-metadata"
import "regenerator-runtime/runtime"
import "./_utils/configEnv"

import cors from "cors"
import express from "express"

import { registerApolloServer } from "./api/graphql/registerApolloServer"
import { testPublicUrl } from "./api/rest/_utils/testPublicUrl"
import { registerRestEndpoints } from "./api/rest/registerRestEndpoints"
import { appConfig } from "./app/app.config"

const run = async () => {
	const expressApp = express()

	expressApp.use(cors())
	registerApolloServer(expressApp)
	registerRestEndpoints(expressApp)

	const server = expressApp.listen(
		{
			port: appConfig.port,
			host: appConfig.host,
		},
		async () => {
			console.log(`Listening on port ${appConfig.port.toString()} with cors enabled.`)
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
