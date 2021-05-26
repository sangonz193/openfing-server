import { backupDb } from "../../../../modules/backup-db/backupDb"
import { getUserFromSecret } from "../../_utils/getUserFromSecret"
import { Resolvers } from "../../schemas.types"

const resolver: Resolvers["Mutation"]["backupDb"] = async (_, args, context) => {
	const user = await getUserFromSecret(args.secret, context)
	if (!user) {
		throw new Error("Unauthenticated")
	}

	await backupDb()
}

export default resolver
