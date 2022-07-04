import { wait } from "@sangonz193/utils/wait"
import { Token } from "keycloak-connect"

import { signIn } from "../../../../authentication/keycloak/signIn"
import { UserInfo } from "../../../../authentication/keycloak/UserInfo"
import { getGenericErrorParent } from "../../GenericError/GenericError.parent"
import { Resolvers } from "../../schemas.types"
import { getEmailNotValidatedErrorParent } from "./EmailNotValidatedError.parent"
import { getSignInPayloadParent } from "./SignInPayload.parent"
import { validateSignInInput } from "./validateSignInInput"

const resolver: Resolvers["Mutation"]["signIn"] = async (_, args, context) => {
	const validationResult = await validateSignInInput(args)
	if (!validationResult.success) {
		await wait(5000)
		return validationResult.errors
	}

	const { grantManager } = context.keycloakConnect
	const { input } = validationResult
	const grant = await signIn({
		context: context,
		email: input.email,
		password: input.password,
	})

	const { access_token, refresh_token } = grant || {}
	if (!access_token || !refresh_token) {
		console.log(new Error(`Could not obtain access token`))
		return getGenericErrorParent()
	}

	const userInfo = await grantManager.userInfo<Token, UserInfo>(access_token)
	if (!userInfo.email_verified) {
		return getEmailNotValidatedErrorParent()
	}

	const { token: accessToken } = access_token as unknown as { token: string }
	const { token: refreshToken } = refresh_token as unknown as { token: string }

	return getSignInPayloadParent({
		grant: {
			__typename: "Grant",
			refreshToken: refreshToken,
			token: accessToken,
		},
	})
}

export default resolver
