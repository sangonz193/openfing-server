import { restore } from "../../../../modules/backup/restore"
import { withUserFromSecret } from "../../middlewares/withUserFromSecret"
import { Resolvers } from "../../schemas.types"

const resolver: Resolvers["Mutation"]["restoreDb"] = withUserFromSecret(async () => {
	await restore()
	console.log("restore successful")
})

export default resolver
