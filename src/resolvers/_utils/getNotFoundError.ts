import { NotFoundError } from "../../generated/graphql.types";

export const getNotFoundError = (): NotFoundError => ({ __typename: "NotFoundError", _: null });
