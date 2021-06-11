import DataLoader from "dataloader"
import { Pool } from "pg"

import { db } from "../zapatos/zapatos.db"
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

	const rows = await db
		.select("email_validation", {
			id: db.sql<db.SQL>`${db.self} IN (${db.vals(emailValidationIds)})`,
		})
		.run(pool)

	return emailValidationIds.map((id) => {
		const row = rows.find((row) => row.id === id)
		if (!row) {
			return null
		}

		return {
			...row,
			issued_at: db.toDate(row.issued_at),
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
