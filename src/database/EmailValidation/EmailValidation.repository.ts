import { SafeOmit } from "@sangonz193/utils/SafeOmit"
import { Pool } from "pg"

import { DeleteEmailValidationOptions, deleteEmailValidations } from "./deleteEmailValidation"
import { findEmailValidationBatch, FindEmailValidationBatchOptions } from "./findEmailValidationBatch"
import { insertEmailValidation, InsertEmailValidationOptions } from "./insertEmailValidation"

export type EmailValidationRepository = ReturnType<typeof getEmailValidationRepository>

export function getEmailValidationRepository(pool: Pool) {
	return {
		find: (options: SafeOmit<FindEmailValidationBatchOptions, "pool">) =>
			findEmailValidationBatch({ pool, ...options }),

		insert: (options: SafeOmit<InsertEmailValidationOptions, "pool">) =>
			insertEmailValidation({
				pool,
				...options,
			}),

		delete: (options: SafeOmit<DeleteEmailValidationOptions, "pool">) =>
			deleteEmailValidations({ pool, ...options }),
	}
}
