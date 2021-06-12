import DataLoader from "dataloader"
import identity from "lodash/identity"
import { Connection } from "typeorm"

import { emailValidationColumns, emailValidationEntitySchema } from "./EmailValidation.entity"
import { EmailValidationRow } from "./EmailValidation.entity.types"

export type FindEmailValidationByIdBatchOptions = {
	connection: Connection
	emailValidationIds: readonly string[]
}

export async function findEmailValidationByIdBatch(
	options: FindEmailValidationByIdBatchOptions
): Promise<Array<EmailValidationRow | null>> {
	const { connection, emailValidationIds } = options
	const rows = await connection
		.createQueryBuilder<EmailValidationRow>(emailValidationEntitySchema, "emailValidation")
		.where(
			`emailValidation.${emailValidationColumns.id.name} in (:...ids)`,
			identity<{ ids: Array<EmailValidationRow["id"]> }>({ ids: [...emailValidationIds] })
		)
		.getMany()

	return emailValidationIds.map((id) => {
		return rows.find((row) => row.id === id) ?? null
	})
}

export function getFindEmailValidationByIdBatchDataLoader(connection: Connection) {
	return new DataLoader<string, EmailValidationRow | null>(
		(emailValidationIds) =>
			findEmailValidationByIdBatch({
				connection,
				emailValidationIds,
			}),
		{
			cache: false,
		}
	)
}
