import { dangerousKeysOf } from "@sangonz193/utils/dangerousKeysOf"
import { getUuid } from "@sangonz193/utils/getUuid"
import { SafeOmit } from "@sangonz193/utils/SafeOmit"
import { pick } from "lodash"
import { Pool } from "pg"

import { zapatosDb } from "../zapatos/zapatos.db"
import { zapatosSchema } from "../zapatos/zapatos.schema"
import { EmailValidationRow } from "./EmailValidation.entity.types"

type NullableInsertEmailValidationDataKeys = "id"
export type InsertEmailValidationData = SafeOmit<EmailValidationRow, NullableInsertEmailValidationDataKeys> &
	Partial<Pick<EmailValidationRow, NullableInsertEmailValidationDataKeys>>

export type InsertEmailValidationOptions = {
	pool: Pool
	data: InsertEmailValidationData
}

export async function insertEmailValidation(options: InsertEmailValidationOptions): Promise<EmailValidationRow> {
	const { pool, data } = options

	const cleanData = pick<zapatosSchema.email_validation.Insertable, keyof typeof data>(
		{
			...data,
			id: data.id ?? getUuid(),
		},
		dangerousKeysOf<Record<keyof zapatosSchema.email_validation.Insertable, 0>>({
			id: 0,
			issued_at: 0,
			user_id: 0,
		})
	)

	const insertResult = await zapatosDb.insert("email_validation", cleanData).run(pool)

	return {
		...insertResult,
		issued_at: zapatosDb.toDate(insertResult.issued_at),
	}
}
