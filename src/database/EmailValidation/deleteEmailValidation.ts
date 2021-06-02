import { Pool } from "pg"

import { db } from "../zapatos/zapatos.db"

export type DeleteEmailValidationOptions = {
	pool: Pool
	userId: string
}

export async function deleteEmailValidations(options: DeleteEmailValidationOptions): Promise<boolean> {
	const { pool, userId } = options

	const rows = await db
		.deletes("email_validation", {
			user_id: userId,
		})
		.run(pool)

	return rows.length > 0
}
