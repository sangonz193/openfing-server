import "core-js/stable";
import "moment-timezone";
import "reflect-metadata";
import "regenerator-runtime/runtime";
import "./_utils/configEnv";

import cors from "cors";
import express from "express";

import { registerApolloServer } from "./api/graphql/registerApolloServer";
import { appConfig } from "./config/app.config";
import { getOrmConnection } from "./database/getOrmConnection";
import { getRepositories } from "./database/repositories";
import { getKeycloakAdminClient } from "./modules/keycloak/getKeycloakAdminClient";
import { getKeycloakConnect } from "./modules/keycloak/getKeycloakConnect";

const run = async () => {
	const [ormConnection, keycloakAdminClient, keycloakConnect] = await Promise.all([
		getOrmConnection().then(async (connection) => {
			await connection.runMigrations();
			return connection;
		}),
		getKeycloakAdminClient(),
		getKeycloakConnect(),
	]);

	const expressApp = express();
	const repositories = getRepositories(ormConnection);

	expressApp.use(cors());
	await registerApolloServer({
		expressApp,
		keycloakAdminClient,
		ormConnection,
		repositories,
		keycloakConnect,
	});

	const server = expressApp.listen(
		{
			port: appConfig.port,
			host: appConfig.host,
		},
		async () => {
			console.log(`Listening on port ${appConfig.port.toString()} with cors enabled`);
		}
	);

	server.addListener("error", (error) => {
		console.error(error);

		process.exit(1);
	});
};

run().catch((error) => {
	console.error(error);

	process.exit(1);
});
