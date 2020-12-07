import path from "path";
import { Pool } from "pg";
import { to as copyTo } from "pg-copy-streams";
import simpleGit from "simple-git";
import { Connection } from "typeorm";

import { _fs } from "../_utils/fs";
import { appConfig } from "../appConfig";
import { entities } from "../entities";

export const backupDb = async (connection: Connection) => {
	const { DATABASE_BACKUP_REPO_PATH, dbConnectionOptions } = appConfig;

	if (!DATABASE_BACKUP_REPO_PATH || appConfig.SKIP_DATABASE_BACKUP) {
		console.log("skipping backup");
		return;
	}

	const tableNames = entities.map((entity) => connection.getRepository(entity).metadata.tableName);

	const pool = new Pool({
		database: dbConnectionOptions.database,
		password: dbConnectionOptions.password,
		port: dbConnectionOptions.port,
		user: dbConnectionOptions.username,
		host: dbConnectionOptions.host,
	});

	await new Promise((resolve, reject) => {
		pool.connect(async (err, client, done) => {
			if (err) {
				reject(err);
				return;
			}

			const { schema } = dbConnectionOptions;
			await Promise.all(
				tableNames.map(async (tableName) => {
					const backupFilePath = `${path.resolve(DATABASE_BACKUP_REPO_PATH, tableName + ".csv")}`;
					const stream = client.query(
						copyTo(`COPY "${schema}"."${tableName}" TO STDOUT DELIMITER ',' CSV HEADER`)
					);

					const fileStream = _fs.createWriteStream(backupFilePath);

					setTimeout(() => stream.pipe(fileStream), 0);
					await Promise.all([
						new Promise((resolve, reject) => {
							stream.on("end", resolve);
							stream.on("error", reject);
						}),
						new Promise((resolve) => {
							fileStream.on("close", resolve);
						}),
					]);
				})
			);
			done();
			resolve();
		});
	});

	const git = simpleGit({
		baseDir: DATABASE_BACKUP_REPO_PATH,
	});

	const status = await git.status();

	if (!status.isClean()) {
		await git.add(".");
		await git.commit("backup");
		await git.push();
	} else console.log("No changes detected, won't backup");
};
