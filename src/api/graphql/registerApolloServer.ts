import { ApolloServer } from "apollo-server-express"
import type express from "express"

import { getRequestContext } from "../../context/getRequestContext"
import { graphqlConfig } from "./graphql.config"
import { resolvers } from "./resolvers"
import { typeDefs } from "./schemas"

export const registerApolloServer = (expressApp: express.Application) => {
	const apolloServer = new ApolloServer({
		typeDefs: typeDefs,
		resolvers: resolvers,
		playground: true,
		formatError: (e) => {
			console.error(e)
			return new Error("Internal server error")
		},
		context: getRequestContext,
	})

	apolloServer.applyMiddleware({ app: expressApp, path: graphqlConfig.path })
}
