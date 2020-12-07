import { Context } from "../../Context";
import { ResolverFn } from "../../generated/graphql.types";
import { getUserParent, UserParent } from "../User/User.parent";

export const updatedByResolver: ResolverFn<
	UserParent | null,
	Record<"updated_by_id", number | null>,
	Context,
	{}
> = async (parent, _, { dataLoaders }) => {
	const user = await (parent.updated_by_id && dataLoaders.user.load({ id: parent.updated_by_id }));

	return user ? getUserParent(user) : null;
};
