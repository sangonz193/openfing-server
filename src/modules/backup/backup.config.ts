import * as yup from "yup"

import { validateEnv } from "../../_utils/validateEnv"
import { resolveOptionalEnvLocalPathTransform } from "../../app/resolveEnvLocalPathTransform"

const validatedEnv = validateEnv({
	DATABASE_BACKUP_REPO_PATH: yup.string().notRequired().transform(resolveOptionalEnvLocalPathTransform),
	SKIP_DATABASE_BACKUP: yup.boolean().default(true).required(),
})

export const backupConfig = {
	enabled: !validatedEnv.SKIP_DATABASE_BACKUP,
	backupRepoPath: validatedEnv.DATABASE_BACKUP_REPO_PATH,
}
