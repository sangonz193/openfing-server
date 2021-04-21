import { GraphQLScalarType, GraphQLScalarTypeConfig } from "graphql";
import identity from "lodash/identity";

import { Resolvers } from "../generated/graphql.types";

const resolver: Resolvers["ISODate"] = new GraphQLScalarType(
	identity<GraphQLScalarTypeConfig<Date, string>>({
		name: "ISODate",
		serialize: (date) => date.toISOString(),
		parseValue: (value) => new Date(Date.parse(value)),
	})
);

export default resolver;
