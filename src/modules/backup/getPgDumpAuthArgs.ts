import { databaseConfig } from "../../database/database.config"

export function getPgDumpAuthArgs(config: typeof databaseConfig.typeormConfig): string[] {
	// represents the connection from inside the docker container.
	return [
		...["-h", "localhost"],
		...["--port", "5432"],
		...(config.username ? ["-U", config.username.toString()] : []),
	]
}
