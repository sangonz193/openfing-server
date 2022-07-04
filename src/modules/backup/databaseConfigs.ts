import { keycloakConfig } from "../../authentication/keycloak"
import { databaseConfig } from "../../database/database.config"

export const databaseConfigs = [databaseConfig.typeormConfig, keycloakConfig.typeormConfig]
