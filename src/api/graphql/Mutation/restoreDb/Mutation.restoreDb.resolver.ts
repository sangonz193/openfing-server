import { restore } from "../../../../modules/backup/restore"
import { getUserFromSecret } from "../../_utils/getUserFromSecret"
import { Resolvers } from "../../schemas.types"

const resolver: Resolvers["Mutation"]["restoreDb"] = async (_, args, context) => {
	const user = await getUserFromSecret(args.secret, context)
	if (!user) {
		throw new Error("Unauthenticated")
	}

	await restore()
	console.log("restore successful")
}

export default resolver
