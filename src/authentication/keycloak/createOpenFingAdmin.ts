import { RequestContext } from "../../context/RequestContext"
import { createUser } from "./createUser"
import { openFingAdminUserConfig } from "./openFingAdminUser.config"

export function createOpenFingAdmin(context: Pick<RequestContext, "keycloakAdminClient">) {
	return createUser({
		email: openFingAdminUserConfig.email,
		firstName: openFingAdminUserConfig.firstName,
		password: openFingAdminUserConfig.password,
		emailVerified: true,
		enabled: true,
		keycloakAdminClient: context.keycloakAdminClient.current,
	})
}
