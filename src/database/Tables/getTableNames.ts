import { Pool } from "pg"

import { db } from "../zapatos/zapatos.db"

export async function getTableNames(pool: Pool, schema: string): Promise<string[]> {
	const tables = await db
		.select(
			"tables",
			{
				table_schema: schema,
			},
			{
				columns: ["table_name"],
			}
		)
		.run(pool)

	return tables
		.map((table) => table.table_name)
		.filter((value): value is Exclude<typeof value, null> => value !== null)
}
