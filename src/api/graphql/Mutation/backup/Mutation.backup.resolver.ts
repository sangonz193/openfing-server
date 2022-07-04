import { backup } from "../../../../modules/backup/backup"
import { withAuthenticatedUser } from "../../middlewares/withAuthenticatedUser"
import { Resolvers } from "../../schemas.types"

const resolver: Resolvers["Mutation"]["backup"] = withAuthenticatedUser(() => backup())

export default resolver
