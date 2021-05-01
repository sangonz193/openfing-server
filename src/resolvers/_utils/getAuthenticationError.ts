import { AuthenticationError } from "../../generated/graphql.types";

export const getAuthenticationError = (): AuthenticationError => ({ __typename: "AuthenticationError", _: null });
