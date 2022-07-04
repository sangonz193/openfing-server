import { UserInfo } from "../../authentication/keycloak/UserInfo"
import { RequestContext } from "../../context/RequestContext"

export async function getUserFromContext(
	context: Pick<RequestContext, "req" | "keycloakConnect" | "user">
): Promise<UserInfo | null> {
	if (context.user) {
		return context.user
	}

	const { req, keycloakConnect } = context
	const [, token] = req.headers.authorization?.match(/^Bearer (.+)$/) || [undefined]

	if (!token) {
		return null
	}

	const user = await keycloakConnect.grantManager.userInfo<string, UserInfo>(token)
	if (user) {
		context.user = user
	}

	return user ?? null
}
