import { getUuid } from "@sangonz193/utils/getUuid"
import { SafeOmit } from "@sangonz193/utils/SafeOmit"
import identity from "lodash/identity"
import { Connection } from "typeorm"

import { emailValidationEntitySchema } from "./EmailValidation.entity"
import { EmailValidationRow } from "./EmailValidation.entity.types"

type NullableInsertEmailValidationDataKeys = "id"
export type InsertEmailValidationData = SafeOmit<EmailValidationRow, NullableInsertEmailValidationDataKeys> &
	Partial<Pick<EmailValidationRow, NullableInsertEmailValidationDataKeys>>

export type InsertEmailValidationOptions = {
	connection: Connection
	data: InsertEmailValidationData
}

export async function insertEmailValidation(options: InsertEmailValidationOptions): Promise<EmailValidationRow> {
	const { connection, data } = options

	const { generatedMaps } = await connection
		.createQueryBuilder()
		.insert()
		.into<EmailValidationRow>(emailValidationEntitySchema)
		.values(
			identity<EmailValidationRow>({
				...data,
				id: data.id ?? getUuid(),
			})
		)
		.returning("*")
		.execute()

	return generatedMaps[0] as EmailValidationRow
}
