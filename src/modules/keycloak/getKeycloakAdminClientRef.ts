import KeycloakAdminClient from "keycloak-admin";

import { keycloakConfig } from "./keycloak.config";

export const getKeycloakAdminClientRef = async (): Promise<{ current: KeycloakAdminClient }> => {
	const ref = {
		current: await createAdminClient(),
	};

	setInterval(async () => {
		ref.current = await createAdminClient();
	}, 1000 * 60 * 1);

	return ref;
};

async function createAdminClient() {
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
}
