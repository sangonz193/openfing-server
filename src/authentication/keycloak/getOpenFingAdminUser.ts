import { SafeOmit } from "@sangonz193/utils/SafeOmit"
import _UserRepresentation from "keycloak-admin/lib/defs/userRepresentation"
import { Token } from "keycloak-connect"

import { RequestContext } from "../../context/RequestContext"
import { getOpenFingAdminGrant } from "./getOpenFingAdminGrant"
import { UserInfo } from "./UserInfo"

export type UserRepresentation = SafeOmit<_UserRepresentation, "id"> & { id: string }

export async function getOpenFingAdminUser(
	context: Pick<RequestContext, "keycloakAdminClient" | "keycloakConnect">
): Promise<UserInfo> {
	const grant = await getOpenFingAdminGrant(context)

	if (!grant.access_token) {
		throw new Error("No access token received.")
	}

	return context.keycloakConnect.grantManager.userInfo<Token, UserInfo>(grant.access_token)
}
