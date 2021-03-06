import path from "path"

import { projectPath } from "../../_utils/projectPath"

// TODO: Either delete or update const name.

export const generatedFilesGlobs = {
	entitiesIndex: path.resolve(projectPath, "src", "database", "entities.ts"),
	repositoriesIndex: path.resolve(projectPath, "src", "database", "repositories.ts"),
	resolversIndex: path.resolve(projectPath, "src", "api", "graphql", "resolvers.ts"),
	schemasIndex: path.resolve(projectPath, "src", "api", "graphql", "schemas.ts"),
	schemasTypeIndex: path.resolve(projectPath, "src", "api", "graphql", "schemas.types.ts"),
	restEndpoints: path.resolve(projectPath, "src", "api", "rest", "endpoints.ts"),
}
