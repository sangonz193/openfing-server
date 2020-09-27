import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import * as yup from "yup";

import { SafeOmit } from "../_utils/utilTypes";
import { entities } from "../entities";
import { isProduction } from "./isProduction";

const valdatedEnv = yup
	.object({
		WRITE_DB_NAME: yup.string().trim().required(),
		WRITE_DB_HOST: yup.string().trim().required(),
		WRITE_DB_PORT: yup.number().integer().required(),
		WRITE_DB_USERNAME: yup.string().trim().required(),
		WRITE_DB_PASSWORD: yup.string().trim().required(),
	})
	.required()
	.validateSync(process.env);

export const dbConnectionOptions: SafeOmit<PostgresConnectionOptions, "password"> & { password: string } = {
	type: "postgres",
	database: valdatedEnv.WRITE_DB_NAME,
	host: valdatedEnv.WRITE_DB_HOST,
	port: valdatedEnv.WRITE_DB_PORT,
	username: valdatedEnv.WRITE_DB_USERNAME,
	password: valdatedEnv.WRITE_DB_PASSWORD,
	schema: "openfing",
	entities: Object.values(entities),
	logging: !isProduction,
	migrations: [isProduction ? "dist/migrations/*.js" : "src/migrations/*.ts"],
	cli: {
		migrationsDir: "src/migrations",
	},
};
