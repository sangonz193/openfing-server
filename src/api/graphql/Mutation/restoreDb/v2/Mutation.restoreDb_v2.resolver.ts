import { restore } from "../../../../../modules/backup/restore"
import { withAuthenticatedUser } from "../../../middlewares/withAuthenticatedUser"
import { Resolvers } from "../../../schemas.types"

const resolver: Resolvers["Mutation"]["restoreDb_v2"] = withAuthenticatedUser(async () => {
	await restore()
	console.log("restore successful")
})

export default resolver
