import { IConfig } from "@pgtyped/cli/src/config"

import { databaseConfig } from "./database.config"

export const pgtypedConfig: Partial<IConfig> = {
	db: {
		dbName: databaseConfig.typeormConfig.database,
		host: databaseConfig.typeormConfig.host,
		user: databaseConfig.typeormConfig.username,
		password: databaseConfig.typeormConfig.password,
		port: databaseConfig.typeormConfig.port,
		ssl: undefined,
	},
	srcDir: "./src",
	transforms: [
		{
			mode: "sql",
			include: "**/*.sql",
			emitTemplate: "{{dir}}/{{name}}.sql.generated.ts",
			emitFileName: undefined,
		},
	],
}
