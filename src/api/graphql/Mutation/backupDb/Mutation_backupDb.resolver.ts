import { backup } from "../../../../modules/backup/backup"
import { getUserFromSecret } from "../../_utils/getUserFromSecret"
import { Resolvers } from "../../schemas.types"

const resolver: Resolvers["Mutation"]["backupDb"] = async (_, args, context) => {
	const user = await getUserFromSecret(args.secret, context)
	if (!user) {
		throw new Error("Unauthenticated")
	}

	await backup()
}

export default resolver
