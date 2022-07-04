import { databaseConfig } from "../../database/database.config"

export const openFingAdminUserConfig = {
	email: "open@fing.edu.uy",
	password: databaseConfig.typeormConfig.password,
	firstName: "OpenFING",
}
