import { SafeOmit } from "@sangonz193/utils/SafeOmit"
import { PoolConfig } from "pg"
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"

import { isProduction } from "../app/isProduction.config"
import { databasePoolConfig } from "./databasePool.config"
import { entities } from "./entities"

export const databaseConfig: {
	typeormConfig: SafeOmit<PostgresConnectionOptions, "password" | "schema" | "database"> & {
		password: string
		schema: string
		database: string
	}
	poolConfig: SafeOmit<PoolConfig, "database" | "password"> & {
		password: string
		database: string
	}
} = {
	typeormConfig: {
		type: "postgres",
		database: databasePoolConfig.database,
		host: databasePoolConfig.host,
		port: databasePoolConfig.port,
		username: databasePoolConfig.user,
		password: databasePoolConfig.password,
		schema: "openfing",
		entities: entities,
		logging: !isProduction,
		migrations: [isProduction ? "dist/database/migrations/*.js" : "src/database/migrations/*.ts"],
		cli: {
			migrationsDir: "src/database/migrations",
		},
	},
	poolConfig: databasePoolConfig,
}
