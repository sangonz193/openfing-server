import { Context } from "../../Context";
import { ResolverFn } from "../../generated/graphql.types";
import { getUserParent, UserParent } from "../User/User.parent";

export const createdByResolver: ResolverFn<
	UserParent | null,
	Record<"createdById", number | null>,
	Context,
	{}
> = async (parent, _, { dataLoaders }) => {
	const user = await (parent.createdById && dataLoaders.user.load({ id: parent.createdById }));

	return user ? getUserParent(user) : null;
};
