import KeycloakConnect from "keycloak-connect";

import { keycloakConfig } from "./keycloak.config";

export const getKeycloakConnect = async (): Promise<KeycloakConnect.Keycloak> => {
	const keycloakConnect = new KeycloakConnect(
		{},
		{
			realm: keycloakConfig.realm,
			"auth-server-url": keycloakConfig.serverUrl + "/",
			"ssl-required": "external",
			resource: keycloakConfig.clientId,
			"confidential-port": "",
		}
	);

	return keycloakConnect;
};
