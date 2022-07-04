import { GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql"
import identity from "lodash/identity"

import { Resolvers } from "../schemas.types"

const resolver: Resolvers["ISODate"] = new GraphQLScalarType(
	identity<GraphQLScalarTypeConfig<Date, string>>({
		name: "ISODate",
		serialize: (date) => date.toISOString(), // TODO: remove time.
		parseValue: (value) => new Date(Date.parse(value)),
	})
)

export default resolver
