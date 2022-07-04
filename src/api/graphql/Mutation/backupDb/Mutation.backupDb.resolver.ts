import { backup } from "../../../../modules/backup/backup"
import { withUserFromSecret } from "../../middlewares/withUserFromSecret"
import { Resolvers } from "../../schemas.types"

const resolver: Resolvers["Mutation"]["backupDb"] = withUserFromSecret(() => backup())

export default resolver
