import express from "express"
import KeycloakConnect from "keycloak-connect"

export async function getUserFromReq(req: express.Request, keycloakConnect: KeycloakConnect.Keycloak) {
	const token = req.headers.authorization?.split("Bearer ")[0]
	if (!token) {
		return undefined
	}

	return keycloakConnect.grantManager.userInfo(token)
}
