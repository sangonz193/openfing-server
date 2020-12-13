import csvStringify from "csv-stringify";
import path from "path";
import { Pool } from "pg";
import { from as copyFrom } from "pg-copy-streams";
import { createConnection, getRepository } from "typeorm";
import { CommandModule } from "yargs";

import { fs } from "../../_utils/fs";
import { fsExists } from "../../_utils/fsExists";
import { hashPassword } from "../../../src/_helpers/hashPassword";
import { dangerousKeysOf } from "../../../src/_utils/dangerousKeysOf";
import { _fs } from "../../../src/_utils/fs";
import { getDbConnectionOptions } from "../../../src/config/getDbConnectionOptions";
import { entities } from "../../../src/entities";
import { UserRoleCode } from "../../../src/entities/UserRole";
import { getUserRepository } from "../../../src/repositories/User";
import { getUserRoleRepository } from "../../../src/repositories/UserRole";
import { getUserToUserRoleRepository } from "../../../src/repositories/UserToUserRole";
import { valueToCSV } from "./valueToCSV";

const command: CommandModule<{}, {}> = {
	command: "seed",

	describe:
		"Populates the database with dummy values. Not to be used on production. " +
		"Should only be called once. Deletes any current data!",

	builder: (yargs) => yargs,

	handler: async () => {
		const dbConnectionOptions = getDbConnectionOptions();
		const connection = await createConnection(dbConnectionOptions);
		const { schema } = dbConnectionOptions;

		await connection.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
		await connection.query(`CREATE SCHEMA "${schema}"`);
		await connection.runMigrations();

		const adminUserRole = await getUserRoleRepository(connection).save({
			code: UserRoleCode.admin,
		});

		await getUserRoleRepository(connection).save({
			code: UserRoleCode.user,
		});

		const user = await getUserRepository(connection).save(
			getUserRepository(connection).create({
				email: "open@fing.edu.uy",
				uid: "openfing",
				password: await hashPassword("password"),
				name: "OpenFING",
				created_at: new Date(),
				updated_at: new Date(),
				deleted_at: null,
			})
		);

		await getUserToUserRoleRepository(connection).save({
			user_id: user.id,
			user_role_id: adminUserRole.id,
		});

		await Promise.all(
			entities.map(async (entityToCopy) => {
				const dumpFilePath = path.resolve(__dirname, "data", entityToCopy.options.name + ".json");

				if (!(await fsExists(dumpFilePath))) return;

				const { records } = require(dumpFilePath) as { records: Array<Record<string, unknown>> };

				const stringify = async (p: unknown[][]) => {
					p = p.map((i) => i.map((value) => valueToCSV(value)));

					const result = await new Promise((resolve) =>
						csvStringify(p, (err, output) => {
							resolve(output);
						})
					);

					return result;
				};

				const valuesFrom = <T extends Record<string, unknown>>(
					value: T,
					keys: Array<[string, string]>
				): unknown[] => keys.map((k) => value[k[0]]);

				const keys = dangerousKeysOf(entityToCopy.options.columns).map<[string, string]>((key) => [
					key,
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					entityToCopy.options.columns[key]!.name!,
				]);

				const filePath = path.join(dumpFilePath + "__");
				await fs.writeFile(filePath, await stringify(records.map((record) => valuesFrom(record, keys))));
				const fileStream = _fs.createReadStream(filePath);

				const pool = new Pool({
					database: dbConnectionOptions.database,
					password: dbConnectionOptions.password,
					port: dbConnectionOptions.port,
					user: dbConnectionOptions.username,
					host: dbConnectionOptions.host,
				});

				const repository = getRepository(entityToCopy);
				await connection.query(
					`alter table ${repository.metadata.schema ?? ""}.${
						repository.metadata.tableName
					} disable trigger all`
				);

				try {
					await new Promise((resolve, reject) => {
						pool.connect((err, client, done) => {
							if (err) reject(err);

							const stream = client.query(
								copyFrom(
									`COPY ${repository.metadata.schema ?? ""}.${
										repository.metadata.tableName
									} (${keys.map((e) => `"${e[1]}"`).join(",")}) FROM STDIN WITH CSV;`
								)
							);

							new Promise((resolve, reject) => {
								fileStream.on("error", () => {
									done();
								});

								stream.on("error", (e) => {
									done();
									reject(e);
								});
								stream.on("finish", () => {
									done();
									resolve();
								});

								fileStream.pipe(stream);
							})
								.then(resolve)
								.catch(reject);
						});
					});

					if (entityToCopy.options.columns.id?.type !== "uuid")
						await connection.query(
							`SELECT setval(pg_get_serial_sequence('${repository.metadata.schema ?? ""}.${
								repository.metadata.tableName
							}', 'id'), max(id)) FROM ${repository.metadata.schema ?? ""}.${
								repository.metadata.tableName
							}; `
						);
				} catch (e) {
					console.log(e);
					process.exit(1);
				}

				await fs.unlink(filePath);
				await connection.query(
					`alter table ${repository.metadata.schema ?? ""}.${
						repository.metadata.tableName
					} enable trigger all;`
				);
			})
		);

		await connection.close();
	},
};

export default command;
