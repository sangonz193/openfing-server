import { Pool } from "pg"

import { zapatosDb } from "../zapatos/zapatos.db"

export async function getTableNames(pool: Pool, schema: string): Promise<string[]> {
	const tables = await zapatosDb.sql<
		zapatosDb.SQL,
		Array<{ table_name: string | null }>
	>`select table_name from information_schema.tables where table_schema = ${zapatosDb.param(schema)}`.run(pool)

	return tables
		.map((table) => table.table_name)
		.filter((value): value is Exclude<typeof value, null> => value !== null)
}
