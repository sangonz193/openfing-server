// import { wait } from "@sangonz193/utils/wait"
// import KeycloakAdminClient from "keycloak-admin"

// import { keycloakConfig } from "./keycloak.config"

// export const getkeycloakAdminClient = async (): Promise<{ current: KeycloakAdminClient }> => {
// 	const maxRetries = 15
// 	let tries = 0
// 	let adminClient: KeycloakAdminClient | undefined = undefined

// 	while (!adminClient && tries < maxRetries) {
// 		tries++
// 		adminClient = await createAdminClient().catch((error) => {
// 			console.log(error)
// 			return undefined
// 		})
// 		await wait(5000)
// 	}

// 	if (!adminClient) {
// 		throw new Error(`Could not connect to keycloak after ${maxRetries} attempts`)
// 	}

// 	const ref = {
// 		current: adminClient,
// 	}

// 	setInterval(async () => {
// 		ref.current = await createAdminClient()
// 	}, 1000 * 60 * 1)

// 	const clientUniqueId = (await adminClient.clients.find({ clientId: keycloakConfig.clientId }))[0].id!
// 	await adminClient.clients.update(
// 		{
// 			id: clientUniqueId,
// 			realm: keycloakConfig.realm,
// 		},
// 		{
// 			publicClient: false,
// 			serviceAccountsEnabled: true,
// 			authorizationServicesEnabled: true,
// 		}
// 	)
// 	const i = 18
// 	// const resource = await adminClient.clients.createResource(
// 	// 	{
// 	// 		id: clientUniqueId,
// 	// 	},
// 	// 	{
// 	// 		type: "course",
// 	// 		name: "TEST" + i,
// 	// 		displayName: "TEST" + i,
// 	// 		scopes: [{ name: "admin:test" }],
// 	// 	}
// 	// )
// 	// const role = await adminClient.clients.createRole({
// 	// 	id: clientUniqueId,
// 	// 	name: "TEST" + i,
// 	// })
// 	// await adminClient.clients
// 	// 	.createPolicy(
// 	// 		{
// 	// 			id: clientUniqueId,
// 	// 			type: "role",
// 	// 		},
// 	// 		{
// 	// 			roles: [
// 	// 				{
// 	// 					id: (await adminClient.clients.findRole({ id: clientUniqueId, roleName: role.roleName })).id!,
// 	// 				},
// 	// 			],
// 	// 			name: "TEST" + i.toString(),
// 	// 			// resources: [resource.id!],
// 	// 			// owner: (await adminClient.clients.find({ clientId: keycloakConfig.clientId }))[0].id!,
// 	// 			type: "role",
// 	// 		}
// 	// 	)
// 	// 	.catch((e) => {
// 	// 		console.log(e)
// 	// 		throw e
// 	// 	})
// 	console.log("done")
// 	// await createUser({
// 	// 	email: "open@fing.edu.uy",
// 	// 	firstName: "OpenFING",
// 	// 	password: "Password01",
// 	// 	keycloakAdminClient: ref.current,
// 	// })
// 	console.log(
// 		await ref.current.clients.evaluateResource(
// 			{
// 				id: clientUniqueId,
// 			},
// 			{
// 				context: {
// 					attributes: {},
// 				},
// 				entitlements: false,
// 				userId: (await ref.current.users.find({ email: "open@fing.edu.uy" }))[0].id!,
// 				resources: [
// 					(
// 						await adminClient.clients.listResources({
// 							id: clientUniqueId,
// 							name: "TEST18",
// 						})
// 					)[0],
// 				],
// 				roleIds: [],
// 			}
// 		)
// 	)

// 	return ref
// }

// async function createAdminClient() {
// 	const adminClient = new KeycloakAdminClient({
// 		baseUrl: keycloakConfig.serverUrl,
// 	})

// 	await adminClient.auth({
// 		username: keycloakConfig.username,
// 		password: keycloakConfig.password,
// 		grantType: "password",
// 		clientId: keycloakConfig.clientId,
// 	})

// 	const allRealms = await adminClient.realms.find()

// 	if (!allRealms.some((realm) => realm.realm === keycloakConfig.realm)) {
// 		await adminClient.realms.create({
// 			realm: keycloakConfig.realm,
// 			enabled: true,
// 		})
// 	}

// 	adminClient.setConfig({
// 		realmName: keycloakConfig.realm,
// 	})

// 	return adminClient
// }
