import { databaseConfig } from "../database/database.config"

export function validateSecret(secret: string): boolean {
	return databaseConfig.typeormConfig.password === secret
}
