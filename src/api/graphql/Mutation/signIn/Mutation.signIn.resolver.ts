import { getUserFromSecret } from "../../_utils/getUserFromSecret"
import { getGenericErrorParent } from "../../GenericError/GenericError.parent"
import { Resolvers } from "../../schemas.types"
import { getSignInPayloadParent } from "./SignInPayload.parent"
import { validateSignInInput } from "./validateSignInInput"

const resolver: Resolvers["Mutation"]["signIn"] = async (_, args, context) => {
	const user = await getUserFromSecret(args.secret, context)
	if (!user) {
		return getGenericErrorParent()
	}

	const validationResult = await validateSignInInput(args)
	if (!validationResult.success) {
		return validationResult.errors
	}

	const { input } = validationResult
	const grant = await context.keycloakConnect.grantManager
		.obtainDirectly(input.email, input.password)
		.catch((error: unknown) => {
			console.log(error)
			throw error
		})

	const { token: accessToken } = grant.access_token as unknown as { token: string }
	const { token: refreshToken } = grant.refresh_token as unknown as { token: string }
	const { token: idToken } = grant.id_token as unknown as { token: string }

	return getSignInPayloadParent({
		accessToken,
		idToken,
		refreshToken,
	})
}

export default resolver
