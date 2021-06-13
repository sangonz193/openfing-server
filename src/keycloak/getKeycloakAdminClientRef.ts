import { wait } from "@sangonz193/utils/wait"
import KeycloakAdminClient from "keycloak-admin"

import { keycloakConfig } from "./keycloak.config"

export const getKeycloakAdminClientRef = async (): Promise<{ current: KeycloakAdminClient }> => {
	const maxRetries = 15
	let tries = 0
	let adminClient: KeycloakAdminClient | undefined = undefined

	while (!adminClient && tries < maxRetries) {
		tries++
		adminClient = await createAdminClient().catch((error) => {
			console.log(error)
			return undefined
		})
		await wait(5000)
	}

	if (!adminClient) {
		throw new Error(`Could not connect to keycloak after ${maxRetries} attempts`)
	}

	const ref = {
		current: adminClient,
	}

	setInterval(async () => {
		ref.current = await createAdminClient()
	}, 1000 * 60 * 1)

	return ref
}

async function createAdminClient() {
	const adminClient = new KeycloakAdminClient({
		baseUrl: keycloakConfig.serverUrl,
	})

	await adminClient.auth({
		username: keycloakConfig.username,
		password: keycloakConfig.password,
		grantType: "password",
		clientId: keycloakConfig.clientId,
	})

	const allRealms = await adminClient.realms.find()

	if (!allRealms.some((realm) => realm.realm === keycloakConfig.realm)) {
		await adminClient.realms.create({
			realm: keycloakConfig.realm,
			enabled: true,
		})
	}

	adminClient.setConfig({
		realmName: keycloakConfig.realm,
	})

	return adminClient
}
