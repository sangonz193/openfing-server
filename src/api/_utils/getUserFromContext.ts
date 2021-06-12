import { RequestContext } from "../../context/RequestContext"

export async function getUserFromContext(context: Pick<RequestContext, "req" | "keycloakConnect">) {
	const { req, keycloakConnect } = context
	const [, token] = req.headers.authorization?.match(/^Bearer (.+)$/) || [undefined]

	if (!token) {
		return undefined
	}

	return keycloakConnect.grantManager.userInfo(token)
}
