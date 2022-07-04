import { getUuid } from "@sangonz193/utils/getUuid"
import { fs } from "@sangonz193/utils/node/fs"
import path from "path"

import type { databaseConfig } from "../../database/database.config"

export async function writeTmpEnvFile(config: typeof databaseConfig.typeormConfig) {
	const tmpEnvFilePath = path.resolve(__dirname, `backupDb-tmpEnvFile-${getUuid()}`)

	await fs.writeFile(
		tmpEnvFilePath,
		[["PGPASSWORD", config.password]].map(([key, value]) => `${key}="${value}"`).join("\n") + "\n"
	)

	return tmpEnvFilePath
}
