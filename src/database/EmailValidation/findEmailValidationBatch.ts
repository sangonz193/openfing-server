import { hasProperty } from "@sangonz193/utils/hasProperty"
import DataLoader from "dataloader"
import { Pool } from "pg"

import { zapatosDb } from "../zapatos/zapatos.db"
import { zapatosSchema } from "../zapatos/zapatos.schema"
import { EmailValidationRow } from "./EmailValidation.entity.types"

export type FindEmailValidationBatchOptions = {
	pool: Pool
	batchArgs: Array<
		| { id: zapatosSchema.email_validation.Selectable["id"] }
		| { userId: zapatosSchema.email_validation.Selectable["user_id"] }
	>
}

export async function findEmailValidationBatch(
	options: FindEmailValidationBatchOptions
): Promise<Array<EmailValidationRow | null>> {
	const { pool, batchArgs } = options

	const ids: string[] = []
	const userIds: string[] = []

	batchArgs.map((value) => {
		if (hasProperty(value, "id")) {
			ids.push(value.id)
		} else {
			userIds.push(value.userId)
		}
	})

	const rows = await zapatosDb
		.select(
			"email_validation",
			zapatosDb.sql<zapatosSchema.email_validation.SQL>`${{ id: zapatosDb.conditions.isIn(ids) }} OR ${{
				user_id: zapatosDb.conditions.isIn(userIds),
			}}`
		)
		.run(pool)
		.catch((error) => {
			console.log("error", error)
			throw error
		})

	return batchArgs.map((arg) => {
		const row = rows.find(
			hasProperty(arg, "id") //
				? (row) => row.id === arg.id
				: (row) => row.user_id === arg.userId
		)
		if (!row) {
			return null
		}

		return {
			...row,
			issued_at: zapatosDb.toDate(row.issued_at),
		}
	})
}

export function getFindEmailValidationDataLoader(pool: Pool) {
	return new DataLoader<FindEmailValidationBatchOptions["batchArgs"][number], EmailValidationRow | null>(
		(args) =>
			findEmailValidationBatch({
				batchArgs: [...args],
				pool: pool,
			}),
		{
			cache: false,
		}
	)
}
