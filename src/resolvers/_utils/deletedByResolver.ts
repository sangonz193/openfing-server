import { Context } from "../../Context";
import { ResolverFn } from "../../generated/graphql.types";
import { getUserParent, UserParent } from "../User/User.parent";

export const deletedByResolver: ResolverFn<
	UserParent | null,
	Record<"deletedById", number | null>,
	Context,
	{}
> = async (parent, _, { dataLoaders }) => {
	const user = await (parent.deletedById && dataLoaders.user.load({ id: parent.deletedById }));

	return user ? getUserParent(user) : null;
};
