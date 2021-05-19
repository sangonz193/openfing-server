import { _fs } from "@sangonz193/utils/node/fs";
import path from "path";
import { Pool } from "pg";
import { to as copyTo } from "pg-copy-streams";
import simpleGit from "simple-git";
import { Connection } from "typeorm";

import { databaseConfig } from "../../database/database.config";
import { entities } from "../../database/entities";
import { backupConfig } from "./backupDb.config";

export const backupDb = async (connection: Connection) => {
	const { backupRepoPath } = backupConfig;
	const { typeormConfig } = databaseConfig;

	if (!backupRepoPath || !backupConfig.enabled) {
		console.log("skipping backup");
		return;
	}

	const tableNames = entities.map((entity) => connection.getRepository(entity).metadata.tableName);

	const pool = new Pool({
		database: typeormConfig.database,
		password: typeormConfig.password,
		port: typeormConfig.port,
		user: typeormConfig.username,
		host: typeormConfig.host,
	});

	await new Promise<void>((resolve, reject) => {
		pool.connect(async (err, client, done) => {
			if (err) {
				reject(err);
				return;
			}

			const { schema } = typeormConfig;
			await Promise.all(
				tableNames.map(async (tableName) => {
					const backupFilePath = `${path.resolve(backupRepoPath, tableName + ".csv")}`;
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
		baseDir: backupRepoPath,
	});

	const status = await git.status();

	if (!status.isClean()) {
		await git.add(".");
		await git.commit("backup");
		await git.push();
	} else {
		console.log("No changes detected, won't backup");
	}
};
