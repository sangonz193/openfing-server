import { SafeOmit } from "@sangonz193/utils/SafeOmit"
import { Connection } from "typeorm"

import { DeleteEmailValidationOptions, deleteEmailValidations } from "./deleteEmailValidation"
import { findEmailValidationBatch, FindEmailValidationBatchOptions } from "./findEmailValidationBatch"
import { insertEmailValidation, InsertEmailValidationOptions } from "./insertEmailValidation"

export type EmailValidationRepository = ReturnType<typeof getEmailValidationRepository>

export function getEmailValidationRepository(connection: Connection) {
	return {
		find: (options: SafeOmit<FindEmailValidationBatchOptions, "connection">) =>
			findEmailValidationBatch({ connection, ...options }),

		insert: (options: SafeOmit<InsertEmailValidationOptions, "connection">) =>
			insertEmailValidation({
				connection,
				...options,
			}),

		delete: (options: SafeOmit<DeleteEmailValidationOptions, "connection">) =>
			deleteEmailValidations({ connection, ...options }),
	}
}
