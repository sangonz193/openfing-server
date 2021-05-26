import { Connection } from "typeorm"

import { getFindEmailValidationDataLoader } from "./findEmailValidationBatch"

export type EmailValidationDataLoader = ReturnType<typeof getEmailValidationDataLoader>

export function getEmailValidationDataLoader(connection: Connection) {
	return {
		find: getFindEmailValidationDataLoader(connection),
	}
}
