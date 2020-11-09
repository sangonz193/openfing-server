import { Context } from "../../Context";
import { ResolverFn } from "../../generated/graphql.types";
import { getUserParent, UserParent } from "../User/User.parent";

export const updatedByResolver: ResolverFn<
	UserParent | null,
	Record<"updatedById", number | null>,
	Context,
	{}
> = async (parent, _, { dataLoaders }) => {
	const user = await (parent.updatedById && dataLoaders.user.load({ id: parent.updatedById }));

	return user ? getUserParent(user) : null;
};
