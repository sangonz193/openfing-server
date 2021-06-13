import { getUserFromSecret } from "../../_utils/getUserFromSecret"
import { getAuthenticationErrorParent } from "../../AuthenticationError/AuthenticationError.parent"
import { Resolvers } from "../../schemas.types"
import { getUserFromSecretPayload } from "./UserFromSecretPayload.parent"

const resolver: Resolvers["Mutation"]["userFromSecret"] = async (_, args, context) => {
	const user = await getUserFromSecret(args.secret, context)
	if (!user) {
		return getAuthenticationErrorParent()
	}

	return getUserFromSecretPayload(user)
}

export default resolver
