import { GenericError } from "../../generated/graphql.types";

export const getGenericError = (): GenericError => ({ __typename: "GenericError", _: null });
