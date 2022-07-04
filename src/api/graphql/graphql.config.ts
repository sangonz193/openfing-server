import * as yup from "yup"

import { validateEnv } from "../../_utils/validateEnv"

const validatedEnv = validateEnv({
	GRAPHQL_PATH: yup.string().required().min(1),
})

export const graphqlConfig = {
	path: validatedEnv.GRAPHQL_PATH.replace(/^([^\/])/, "/$1").replace(/\/$/, ""),
}
