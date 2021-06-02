import { Pool } from "pg"

import { getFindEmailValidationDataLoader } from "./findEmailValidationBatch"

export type EmailValidationDataLoader = ReturnType<typeof getEmailValidationDataLoader>

export function getEmailValidationDataLoader(pool: Pool) {
	return {
		find: getFindEmailValidationDataLoader(pool),
	}
}
