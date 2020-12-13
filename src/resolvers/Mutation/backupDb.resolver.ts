import { backupDb } from "../../_helpers/backupDb";
import { Resolvers } from "../../generated/graphql.types";
import { getUserFromSecret } from "../_utils/getUserFromSecret";

const resolver: Resolvers["Mutation"]["backupDb"] = async (_, args, context) => {
	const user = await getUserFromSecret(args.secret, context);
	if (!user) throw new Error("Unauthenticated");

	await backupDb(context.ormConnection);
};

export default resolver;
