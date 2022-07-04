import * as yup from "yup"

import { validateEnv } from "../_utils/validateEnv"
import { resolveOptionalEnvLocalPathTransform } from "../app/resolveEnvLocalPathTransform"

const validatedEnv = validateEnv({
	LEGACY_JSON_DATA_FOLDER_PATH: yup.string().notRequired().transform(resolveOptionalEnvLocalPathTransform),
})

export const createLegacyJsonFilesConfig = validatedEnv.LEGACY_JSON_DATA_FOLDER_PATH
	? ({
			enable: true,
			dataFolderPath: validatedEnv.LEGACY_JSON_DATA_FOLDER_PATH,
	  } as const)
	: ({
			enable: false,
			dataFolderPath: validatedEnv.LEGACY_JSON_DATA_FOLDER_PATH,
	  } as const)
