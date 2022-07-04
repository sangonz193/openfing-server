import * as yup from "yup"

import { validateEnv } from "../../_utils/validateEnv"
import { databaseConfig } from "../../database/database.config"

const validatedEnv = validateEnv({
	KEYCLOAK_PORT: yup.number().required().integer(),
	KEYCLOAK_USER: yup.string().required().min(1),
	KEYCLOAK_PASSWORD: yup.string().required().min(1),
	KEYCLOAK_REALM: yup.string().required().min(1),
	ENABLED_EMAIL_ADDRESSES: yup
		.array(yup.string().email().required())
		.transform((_, originalValue: unknown) =>
			typeof originalValue !== "string" ? undefined : originalValue.split(",")
		)
		.min(1)
		.required(),
})

const typeormConfig: typeof databaseConfig.typeormConfig = {
	...databaseConfig.typeormConfig,
	database: "keycloak",
	schema: "public",
}

export const keycloakConfig = {
	port: validatedEnv.KEYCLOAK_PORT,
	username: validatedEnv.KEYCLOAK_USER,
	password: validatedEnv.KEYCLOAK_PASSWORD,
	realm: validatedEnv.KEYCLOAK_REALM,
	serverUrl: `http://localhost:${validatedEnv.KEYCLOAK_PORT}/auth`,
	clientId: "admin-cli",
	typeormConfig: typeormConfig,
	enabledEmailAddresses: validatedEnv.ENABLED_EMAIL_ADDRESSES,
}
