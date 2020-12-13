import path from "path";
import { Pool } from "pg";
import { from as copyFrom } from "pg-copy-streams";

import { _fs } from "../../_utils/fs";
import { appConfig } from "../../appConfig";
import { entities } from "../../entities";
import { Resolvers } from "../../generated/graphql.types";
import { getUserFromSecret } from "../_utils/getUserFromSecret";

const resolver: Resolvers["Mutation"]["resetDatabaseFromBackup"] = async (_, args, context) => {
	const { ormConnection } = context;
	const { dbConnectionOptions } = appConfig;

	const user = await getUserFromSecret(args.secret, context);
	if (!user) return "Unauthenticated";

	const { DATABASE_BACKUP_REPO_PATH } = appConfig;
	if (!DATABASE_BACKUP_REPO_PATH) return "skipping reset; no repo path defined";

	const tableNames = entities.map((entity) => ormConnection.getRepository(entity).metadata.tableName);

	const pool = new Pool({
		database: dbConnectionOptions.database,
		password: dbConnectionOptions.password,
		port: dbConnectionOptions.port,
		user: dbConnectionOptions.username,
		host: dbConnectionOptions.host,
	});

	const { schema } = dbConnectionOptions;

	await ormConnection.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
	await ormConnection.query(`CREATE SCHEMA "${schema}"`);
	await ormConnection.runMigrations();

	let result = "success";
	await new Promise<void>((resolve, reject) => {
		pool.connect(async (err, client, done) => {
			if (err) {
				reject(err);
				return;
			}

			await Promise.all(
				tableNames.map(async (tableName) => {
					const backupFilePath = `${path.resolve(DATABASE_BACKUP_REPO_PATH, tableName + ".csv")}`;

					const stream = client.query(
						copyFrom(`COPY "${schema}"."${tableName}" FROM STDIN DELIMITER ',' CSV HEADER`)
					);

					const fileStream = _fs.createReadStream(backupFilePath);

					setTimeout(() => fileStream.pipe(stream), 0);
					await new Promise<void>((resolve) => {
						fileStream.on("close", () => {
							resolve();
						});
					});
				})
			).catch((e) => (result = e?.message));
			done();
			resolve();
		});
	});

	return result;
};

export default resolver;
