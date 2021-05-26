import { RequestContext } from "../../RequestContext"
import { ResolverFn } from "../schemas.types"
import { getUserParent, UserParent } from "../User/User.parent"

export const deletedByResolver: ResolverFn<
	UserParent | null,
	Record<"deleted_by_id", string | null>,
	RequestContext,
	{}
> = async (parent, _, { dataLoaders }) => {
	const user = await (parent.deleted_by_id && dataLoaders.user.load({ id: parent.deleted_by_id }))

	return user ? getUserParent(user) : null
}
