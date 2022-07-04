import { wait } from "@sangonz193/utils/wait"
import KeycloakAdminClient from "keycloak-admin"
import { Credentials } from "keycloak-admin/lib/utils/auth"

import { keycloakConfig } from "./keycloak.config"

export const getKeycloakAdminClientRef = async (): Promise<{
	current: KeycloakAdminClient
	clientUuid: string
	secret: string | undefined
}> => {
	const maxRetries = 15
	let tries = 0
	let adminClientResponse: [KeycloakAdminClient, string | undefined] | undefined = undefined

	while (!adminClientResponse && tries < maxRetries) {
		tries++
		adminClientResponse = await createAdminClient().catch(async (error) => {
			console.log(error)
			await wait(5000)
			return undefined
		})
	}

	if (!adminClientResponse) {
		throw new Error(`Could not connect to keycloak after ${maxRetries} attempts`)
	}

	const ref = {
		current: adminClientResponse[0],
		clientUuid: (await adminClientResponse[0].clients.find({ clientId: keycloakConfig.clientId }))[0].id as string,
		secret: adminClientResponse[1],
	}

	setInterval(async () => {
		ref.current = (await createAdminClient(adminClientResponse?.[1]))[0]
	}, 1000 * 60 * 1)

	return ref
}

async function createAdminClient(secret?: string): Promise<[KeycloakAdminClient, string | undefined]> {
	const adminClient = new KeycloakAdminClient({
		baseUrl: keycloakConfig.serverUrl,
	})

	const credentials: Credentials = {
		username: keycloakConfig.username,
		password: keycloakConfig.password,
		grantType: "password",
		clientId: keycloakConfig.clientId,
	}

	await adminClient.auth(credentials)

	const allRealms = await adminClient.realms.find()
	if (!allRealms.some((realm) => realm.realm === keycloakConfig.realm)) {
		await adminClient.realms.create({
			realm: keycloakConfig.realm,
		})
	}

	const clients = await adminClient.clients.find({ clientId: keycloakConfig.clientId, realm: keycloakConfig.realm })
	const client = clients.shift()

	if (!secret && client?.id) {
		secret = (await adminClient.clients.getClientSecret({ id: client.id, realm: keycloakConfig.realm })).value
	}

	if (secret) {
		credentials.clientSecret = secret
		await adminClient.auth(credentials)
	}

	await adminClient?.realms.update(
		{
			realm: "master",
		},
		{
			sslRequired: "none",
		}
	)

	await adminClient?.realms.update(
		{
			realm: keycloakConfig.realm,
		},
		{
			enabled: true,
			sslRequired: "none",
		}
	)

	adminClient.setConfig({
		realmName: keycloakConfig.realm,
	})

	if (client?.id) {
		await adminClient.clients.update(
			{
				id: client.id,
				realm: keycloakConfig.realm,
			},
			{
				publicClient: false,
				serviceAccountsEnabled: true,
				authorizationServicesEnabled: true,
			}
		)
	}

	return [adminClient, secret]
}
