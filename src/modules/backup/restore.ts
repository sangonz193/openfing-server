import { databaseConfigs } from "./databaseConfigs"
import { loadDatabaseBackup } from "./loadDatabaseBackup"

export async function restore(): Promise<boolean> {
	return (await Promise.all(databaseConfigs.map((config) => loadDatabaseBackup({ config })))).every((v) => v)
}
