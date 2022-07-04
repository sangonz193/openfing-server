import { GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql"
import identity from "lodash/identity"

import { Resolvers } from "../schemas.types"

const resolver: Resolvers["ISODateTime"] = new GraphQLScalarType(
	identity<GraphQLScalarTypeConfig<Date, string>>({
		name: "ISODateTime",
		serialize: (date) => date.toISOString(),
		parseValue: (value) => new Date(Date.parse(value)),
	})
)

export default resolver
