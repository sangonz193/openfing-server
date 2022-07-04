import { Grant } from "keycloak-connect"

import { RequestContext } from "../../context/RequestContext"
import { createOpenFingAdmin } from "./createOpenFingAdmin"
import { openFingAdminUserConfig } from "./openFingAdminUser.config"
import { signIn } from "./signIn"

export async function getOpenFingAdminGrant(
	context: Pick<RequestContext, "keycloakAdminClient" | "keycloakConnect">
): Promise<Grant> {
	const { email, password } = openFingAdminUserConfig

	const getTokens = async () => {
		try {
			const grant = await signIn({
				context: context,
				email: email,
				password: password,
			})
			return grant
		} catch (error: unknown) {
			console.log("error getOpenFingAdminGrant", error)
			throw error
		}
	}

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
