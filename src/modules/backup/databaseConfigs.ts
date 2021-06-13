import { databaseConfig } from "../../database/database.config"
import { keycloakConfig } from "../keycloak/keycloak.config"

export const databaseConfigs = [databaseConfig.typeormConfig, keycloakConfig.typeormConfig]
