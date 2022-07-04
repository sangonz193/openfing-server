import { dangerousKeysOf } from "@sangonz193/utils/dangerousKeysOf"
import { _fs, fs } from "@sangonz193/utils/node/fs"
import { fsExists } from "@sangonz193/utils/node/fsExists"
import csvStringify from "csv-stringify"
import path from "path"
import { Pool } from "pg"
import { from as copyFrom } from "pg-copy-streams"
import { getRepository } from "typeorm"
import { CommandModule } from "yargs"

import { databaseConfig } from "../../../src/database/database.config"
import { databasePoolConfig } from "../../../src/database/databasePool.config"
import { entities } from "../../../src/database/entities"
import { getOrmConnection } from "../../../src/database/getOrmConnection"
import { valueToCSV } from "./valueToCSV"

// TODO: add keycloak seed data.

const command: CommandModule<{}, {}> = {
	command: "seed",

	describe: false,
	// "Populates the database with dummy values. Not to be used on production. " +
	// "Should only be called once. Deletes any current data!",

	handler: async () => {
		const connection = await getOrmConnection()
		const { schema } = databaseConfig.typeormConfig

		await connection.query(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
		await connection.query(`CREATE SCHEMA "${schema}"`)
		await connection.runMigrations()
		await Promise.all(
			entities.map(async (entityToCopy) => {
				const dumpFilePath = path.resolve(__dirname, "data", entityToCopy.options.name + ".json")

				if (!(await fsExists(dumpFilePath))) {
					return
				}

				const { records } = require(dumpFilePath) as { records: Array<Record<string, unknown>> }

				const stringify = async (p: unknown[][]) => {
					p = p.map((i) => i.map((value) => valueToCSV(value)))

					const result = await new Promise<string>((resolve) =>
						csvStringify(p, (_, output) => {
							resolve(output)
						})
					)

					return result
				}

				const valuesFrom = <T extends Record<string, unknown>>(
					value: T,
					keys: Array<[string, string]>
				): unknown[] => keys.map((k) => value[k[0]])

				const keys = dangerousKeysOf(entityToCopy.options.columns).map<[string, string]>((key) => [
					key,
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					(entityToCopy.options.columns as any)[key]!.name!, // TODO:
				])

				const filePath = path.join(dumpFilePath + "__")
				await fs.writeFile(filePath, await stringify(records.map((record) => valuesFrom(record, keys))))
				const fileStream = _fs.createReadStream(filePath)

				const pool = new Pool(databasePoolConfig)
				const repository = getRepository(entityToCopy)
				const schema = repository.metadata.schema ?? ""
				const tableName = repository.metadata.tableName
				await connection.query(`alter table ${schema}.${tableName} disable trigger all`)

				try {
					await new Promise<void>((resolve, reject) => {
						pool.connect((err, client, done) => {
							if (err) {
								reject(err)
							}

							const stream = client.query(
								copyFrom(
									`COPY ${schema}.${tableName} (${keys
										.map((e) => `"${e[1]}"`)
										.join(",")}) FROM STDIN WITH CSV;`
								)
							)

							new Promise<void>((resolve, reject) => {
								fileStream.on("error", () => {
									done()
								})

								stream.on("error", (e) => {
									done()
									reject(e)
								})
								stream.on("finish", () => {
									done()
									resolve()
								})

								fileStream.pipe(stream)
							})
								.then(resolve)
								.catch(reject)
						})
					})

					if (entityToCopy.options.columns.id?.type !== "uuid") {
						await connection.query(
							`SELECT setval(pg_get_serial_sequence('${schema}.${tableName}', 'id'), max(id)) FROM ${schema}.${tableName}; `
						)
					}
				} catch (e: unknown) {
					console.log(e)
					process.exit(1)
				}

				await fs.unlink(filePath)
				await connection.query(`alter table ${schema}.${tableName} enable trigger all;`)
			})
		)

		await connection.close()
	},
}

export default command
