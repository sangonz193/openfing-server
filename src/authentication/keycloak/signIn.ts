import { Grant } from "keycloak-connect"

import { RequestContext } from "../../context/RequestContext"

export type SignInInput = {
	context: Pick<RequestContext, "keycloakConnect">
	email: string
	password: string
}

export async function signIn({ context, password, email }: SignInInput): Promise<Grant | null> {
	try {
		return await context.keycloakConnect.grantManager.obtainDirectly(email, password, undefined, "offline_access")
	} catch (error: unknown) {
		console.log("Error signing in:", error)
		return null
	}
}
