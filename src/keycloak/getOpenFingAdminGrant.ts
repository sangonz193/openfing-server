import { Grant } from "keycloak-connect"

import { RequestContext } from "../context/RequestContext"
import { databaseConfig } from "../database/database.config"
import { createOpenFingAdmin } from "./createOpenFingAdmin"

export async function getOpenFingAdminAuth(
	context: Pick<RequestContext, "keycloakAdminClient" | "keycloakConnect">
): Promise<Grant> {
	const email = "open@fing.edu.uy"
	const { password } = databaseConfig.typeormConfig

	const getTokens = () => context.keycloakConnect.grantManager.obtainDirectly(email, password).catch(() => null)

	let tokens = await getTokens()
	if (tokens) {
		return tokens
	}

	await createOpenFingAdmin(context)

	tokens = await getTokens()
	if (!tokens) {
		throw new Error("Could not get credentials for admin user.")
	}

	return tokens
}
