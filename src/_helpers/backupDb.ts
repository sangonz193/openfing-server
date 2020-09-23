import path from "path";
import simpleGit from "simple-git";
import { Connection } from "typeorm";

import { fs } from "../_utils/fs";
import { appConfig } from "../appConfig";
import { entities } from "../entities";

export const backupDb = async (connection: Connection) => {
	const { DATABASE_BACKUP_REPO_PATH } = appConfig;

	if (!DATABASE_BACKUP_REPO_PATH) return;

	const repositories = entities.map((entity) => connection.getRepository(entity));

	await Promise.all(
		repositories.map(async (repository) => {
			const rows = await repository.find();

			await fs.writeFile(
				path.resolve(DATABASE_BACKUP_REPO_PATH, `${repository.metadata.tableName}.json`),
				JSON.stringify({ rows }, null, 2)
			);
		})
	);

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
