import identity from "lodash/identity"
import { Connection } from "typeorm"

import { emailValidationColumns, emailValidationEntitySchema } from "./EmailValidation.entity"
import { EmailValidationRow } from "./EmailValidation.entity.types"

export type DeleteEmailValidationOptions = {
	connection: Connection
	userId: string
}

export async function deleteEmailValidations(options: DeleteEmailValidationOptions): Promise<boolean> {
	const { connection, userId } = options
	const rows = await connection
		.createQueryBuilder(emailValidationEntitySchema, "emailValidation")
		.delete()
		.from(emailValidationEntitySchema)
		.where(
			`${emailValidationColumns.user_id.name} = :userId`,
			identity<{ userId: EmailValidationRow["user_id"] }>({ userId: userId })
		)
		.execute()

	return (rows.affected ?? 0) > 0
}
