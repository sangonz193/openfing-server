import { Token } from "keycloak-connect"

import { getGenericErrorParent } from "../../GenericError/GenericError.parent"
import { Resolvers } from "../../schemas.types"
import { getRefreshTokenPayloadParent } from "./RefreshTokenPayload.parent"

const resolver: Resolvers["Mutation"]["refreshToken"] = async (_, args, context) => {
	try {
		const grant = await context.keycloakConnect.grantManager.createGrant({
			refresh_token: args.input.refreshToken as unknown as Token,
		})

		if (!grant.access_token || !grant.refresh_token) {
			return getGenericErrorParent()
		}

		return getRefreshTokenPayloadParent({
			grant: {
				__typename: "Grant",
				refreshToken: (grant.refresh_token as unknown as { token: string }).token,
				token: (grant.access_token as unknown as { token: string }).token,
			},
		})
	} catch (error: unknown) {
		console.log(error)
		return getGenericErrorParent()
	}
}

export default resolver
