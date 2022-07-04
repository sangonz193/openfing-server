import DataLoader from "dataloader"
import { Pool } from "pg"

import { zapatosDb } from "../zapatos/zapatos.db"
import { zapatosSchema } from "../zapatos/zapatos.schema"
import { PostRow } from "./Post.entity.types"

export type FindPostBatchOptions = {
	pool: Pool
	batchArgs: Array<{ id: zapatosSchema.post.Selectable["id"] }>
}

export async function findPostBatch(options: FindPostBatchOptions): Promise<Array<PostRow | null>> {
	const { pool, batchArgs } = options

	const ids: string[] = batchArgs.map(({ id }) => id)

	const rows = await zapatosDb
		.select("post", zapatosDb.sql<zapatosSchema.post.SQL>`${{ id: zapatosDb.conditions.isIn(ids) }}`)
		.run(pool)
		.catch((error) => {
			console.log("error", error)
			throw error
		})

	return batchArgs.map((arg) => {
		const row = rows.find((row) => row.id === arg.id)
		if (!row) {
			return null
		}

		return {
			...row,
			published_at: zapatosDb.toDate(row.published_at),
			created_at: zapatosDb.toDate(row.created_at),
			updated_at: zapatosDb.toDate(row.updated_at),
			deleted_at: zapatosDb.toDate(row.deleted_at),
		}
	})
}

export function getFindPostDataLoader(pool: Pool) {
	return new DataLoader<FindPostBatchOptions["batchArgs"][number], PostRow | null>(
		(args) =>
			findPostBatch({
				batchArgs: [...args],
				pool: pool,
			}),
		{
			cache: false,
		}
	)
}
