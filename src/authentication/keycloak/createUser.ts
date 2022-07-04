import KeycloakAdminClient from "keycloak-admin"

export type CreateUserOptions = {
	email: string
	firstName: string
	lastName?: string
	password: string
	emailVerified: boolean
	enabled?: boolean
	keycloakAdminClient: KeycloakAdminClient
}

export async function createUser({
	email,
	firstName,
	lastName,
	password,
	emailVerified,
	enabled = true,
	keycloakAdminClient,
}: CreateUserOptions) {
	return await keycloakAdminClient.users.create({
		firstName: firstName,
		lastName: lastName,
		email: email,
		username: email,
		credentials: [
			{
				temporary: false,
				type: "password",
				value: password,
			},
		],
		emailVerified: emailVerified,
		enabled: enabled,
	})
}
