import path from "path"

import { projectPath } from "../../_utils/projectPath"

export const dockerConfig = {
	useSudo: false,
	volumePath: path.resolve(projectPath, "docker", "db-data-gitignore"),
	volumePathFromContainer: "/var/lib/postgresql/data",
}
