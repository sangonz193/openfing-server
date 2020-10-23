import "core-js/stable";
import "moment-timezone";
import "reflect-metadata";
import "regenerator-runtime/runtime";
import "./_utils/configEnv";

import { formatError } from "apollo-errors";
import type { ContextFunction } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import cors from "cors";
import express from "express";
import { GraphQLFormattedError } from "graphql";
import { createConnection } from "typeorm";

import { appConfig } from "./appConfig";
import { Context } from "./Context";
import { getDataLoaders } from "./dataloaders";
import { resolvers } from "./generated/resolvers";
import { typeDefs } from "./generated/typeDefs";

(async () => {
	const connection = await createConnection(appConfig.dbConnectionOptions);

	const { schema } = appConfig.dbConnectionOptions;
	const schemaExists =
		(await connection.query(`SELECT schema_name FROM information_schema.schemata WHERE schema_name = '${schema}';`))
			.length > 0;

	if (!schemaExists) await connection.query(`CREATE SCHEMA ${appConfig.dbConnectionOptions.schema}`);

	await connection.runMigrations();

	const expressApp = express();
	expressApp.use(cors());

	const context: ContextFunction<ExpressContext, Context> = async ({ req, res }) => {
		let _dataLoaders: Context["dataLoaders"] | undefined;

		return {
			ormConnection: connection,
			req,
			res,
			get dataLoaders(): Context["dataLoaders"] {
				if (_dataLoaders) return _dataLoaders;

				return (_dataLoaders = getDataLoaders(connection));
			},
		};
	};

	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers,
		playground: true,
		formatError: (e) => {
			console.error(e);

			return formatError(e) as GraphQLFormattedError;
		},
		context,
	});

	apolloServer.applyMiddleware({ app: expressApp, path: appConfig.GRAPHQL_PATH });

	expressApp
		.listen(
			{
				port: appConfig.PORT,
				host: appConfig.HOST,
			},
			async () => {
				console.log(`Listening on port ${appConfig.PORT} with cors enabled`);
			}
		)
		.addListener("error", (error) => {
			console.error(error);

			process.exit(1);
		});
})().catch((error) => {
	console.error(error);

	process.exit(1);
});
