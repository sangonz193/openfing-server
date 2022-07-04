import { RequestContext } from "../../../context/RequestContext"
import { ResolverFn } from "../schemas.types"
import { UserParent } from "../User/User.parent"

export const updatedByResolver: ResolverFn<UserParent | null, {}, RequestContext, {}> = async () => {
	return null
	// const user = await (parent.updated_by_id && dataLoaders.user.load({ id: parent.updated_by_id }))
	// return user ? getUserParent(user) : null
}
