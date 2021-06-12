import { RequestContext } from "../../../context/RequestContext"
import { databaseConfig } from "../../../database/database.config"
import { UserRow } from "../../../database/User"

export const getUserFromSecret = async (secret: string, context: RequestContext): Promise<UserRow | null> => {
	const user = await context.dataLoaders.user.load({ email: "open@fing.edu.uy" })

	if (!user) {
		return null
	}

	return databaseConfig.typeormConfig.password === secret ? user : null
}
