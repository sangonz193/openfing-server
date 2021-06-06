import { ContextFunction } from "apollo-server-core"
import { ApolloServer, ExpressContext } from "apollo-server-express"
import type express from "express"
import KeycloakAdminClient from "keycloak-admin"
import KeycloakConnect from "keycloak-connect"
import { Pool } from "pg"
import { Connection } from "typeorm"

import { Repositories } from "../../database/repositories"
import { getDataLoaders } from "../../dataloaders"
import { RequestContext } from "../RequestContext"
import { graphqlConfig } from "./graphql.config"
import { resolvers } from "./resolvers"
import { typeDefs } from "./schemas"

type RegisterApolloServerOptions = {
	ormConnection: Connection
	pool: Pool
	repositories: Repositories
	keycloakAdminClientRef: { current: KeycloakAdminClient }
	keycloakConnect: KeycloakConnect.Keycloak
	expressApp: express.Application
}

export const registerApolloServer = (options: RegisterApolloServerOptions) => {
	const { ormConnection, pool, repositories, keycloakAdminClientRef, keycloakConnect, expressApp } = options

	const context: ContextFunction<ExpressContext, RequestContext> = async ({ req, res }) => {
		return {
			ormConnection,
			req,
			res,
			dataLoaders: getDataLoaders(repositories, ormConnection, pool),
			repositories,
			keycloakAdminClientRef,
			keycloakConnect: keycloakConnect,
		}
	}

	const apolloServer = new ApolloServer({
		typeDefs: typeDefs,
		resolvers: resolvers,
		playground: true,
		formatError: (e) => {
			console.error(e)
			return new Error("Internal server error")
		},
		context,
	})

	apolloServer.applyMiddleware({ app: expressApp, path: graphqlConfig.path })
}
