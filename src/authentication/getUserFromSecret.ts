import { RequestContext } from "../context/RequestContext"
import { validateSecret } from "."
import { getOpenFingAdminUser } from "./keycloak/getOpenFingAdminUser"
import { UserInfo } from "./keycloak/UserInfo"

export const getUserFromSecret = async (secret: string, context: RequestContext): Promise<UserInfo | null> => {
	if (validateSecret(secret)) {
		return null
	}

	const user = await getOpenFingAdminUser(context)
	return user
}
