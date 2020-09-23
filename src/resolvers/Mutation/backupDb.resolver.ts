import { backupDb } from "../../_helpers/backupDb";
import { appConfig } from "../../appConfig";
import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["Mutation"]["backupDb"] = async (_, args, context) => {
	if (!args.secret || args.secret !== appConfig.dbConnectionOptions.password) throw new Error("Unauthenticated");

	await backupDb(context.ormConnection);
};

export default resolver;
