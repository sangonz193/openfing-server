import { Context } from "../../Context";
import { ResolverFn } from "../../generated/graphql.types";
import { getUserParent, UserParent } from "../User/User.parent";

export const createdByResolver: ResolverFn<
	UserParent | null,
	Record<"created_by_id", string | null>,
	Context,
	{}
> = async (parent, _, { dataLoaders }) => {
	const user = await (parent.created_by_id && dataLoaders.user.load({ id: parent.created_by_id }));

	return user ? getUserParent(user) : null;
};
