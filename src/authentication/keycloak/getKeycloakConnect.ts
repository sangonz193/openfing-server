import KeycloakConnect from "keycloak-connect"

import { RequestContext } from "../../context/RequestContext"
import { getOpenFingAdminGrant } from "./getOpenFingAdminGrant"
import { keycloakConfig } from "./keycloak.config"

export const getKeycloakConnect = async (
	keycloakAdminClient: RequestContext["keycloakAdminClient"],
	secret: string | undefined
): Promise<KeycloakConnect.Keycloak> => {
	const config: KeycloakConnect.KeycloakConfig = {
		realm: keycloakConfig.realm,
		"auth-server-url": keycloakConfig.serverUrl + "/",
		"ssl-required": "external",
		resource: keycloakConfig.clientId,
		"confidential-port": "",
	}

	if (secret) {
		;(config as any).credentials = {
			secret: secret,
		}
	}

	const keycloakConnect = new KeycloakConnect({}, config)

	const token = (
		await getOpenFingAdminGrant({ keycloakAdminClient: keycloakAdminClient, keycloakConnect: keycloakConnect })
	).access_token
	if (token) {
		await keycloakConnect.grantManager.userInfo(token)
	}

	return keycloakConnect
}
