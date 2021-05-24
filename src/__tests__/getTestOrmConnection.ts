import { Connection } from "typeorm";

import { databaseConfig } from "../database/database.config";
import { getOrmConnection } from "../database/getOrmConnection";

export const getTestOrmConnection = async (): Promise<Connection> => {
	databaseConfig.typeormConfig = {
		...databaseConfig.typeormConfig,
		database: process.env.TEST_DB_NAME,
	};

	return getOrmConnection();
};
