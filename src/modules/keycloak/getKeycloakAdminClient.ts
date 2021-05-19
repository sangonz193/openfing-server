import KeycloakAdminClient from "keycloak-admin";

import { keycloakConfig } from "./keycloak.config";

export const getKeycloakAdminClient = async (): Promise<KeycloakAdminClient> => {
	const adminClient = new KeycloakAdminClient({
		baseUrl: keycloakConfig.serverUrl,
	});

	await adminClient.auth({
		username: keycloakConfig.username,
		password: keycloakConfig.password,
		grantType: "password",
		clientId: keycloakConfig.clientId,
	});

	const allRealms = await adminClient.realms.find();

	if (!allRealms.some((realm) => realm.realm === keycloakConfig.realm)) {
		await adminClient.realms.create({
			realm: keycloakConfig.realm,
			enabled: true,
		});
	}

	adminClient.setConfig({
		realmName: keycloakConfig.realm,
	});

	return adminClient;
};
