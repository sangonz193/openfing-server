import DataLoader from "dataloader"
import { Pool } from "pg"

import { zapatosDb } from "../zapatos/zapatos.db"
import { s } from "../zapatos/zapatos.s"
import { EmailValidationRow } from "./EmailValidation.entity.types"

export type FindEmailValidationBatchOptions = {
	pool: Pool
	emailValidationIds: Array<s.email_validation.Selectable["id"]>
}

export async function findEmailValidationBatch(
	options: FindEmailValidationBatchOptions
): Promise<Array<EmailValidationRow | null>> {
	const { pool, emailValidationIds } = options

	const rows = await zapatosDb
		.select("email_validation", {
			id: zapatosDb.sql<zapatosDb.SQL>`${zapatosDb.self} IN (${zapatosDb.vals(emailValidationIds)})`,
		})
		.run(pool)

	return emailValidationIds.map((id) => {
		const row = rows.find((row) => row.id === id)
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
	return new DataLoader<string, EmailValidationRow | null>(
		(emailValidationIds) =>
			findEmailValidationBatch({
				emailValidationIds: [...emailValidationIds],
				pool: pool,
			}),
		{
			cache: false,
		}
	)
}
