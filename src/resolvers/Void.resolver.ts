import { GraphQLScalarType } from "graphql";

import { Resolvers } from "../generated/graphql.types";

const resolver: Resolvers["Void"] = new GraphQLScalarType({ name: "Void" });

export default resolver;
