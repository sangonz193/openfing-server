import path from "path"
import * as yup from "yup"

import { projectPath } from "../../_utils/projectPath"
import { validateEnv } from "../../_utils/validateEnv"

const validatedEnv = validateEnv({
	DOCKER_USE_SUDO: yup.boolean().required()
})

export const dockerConfig = {
	useSudo: validatedEnv.DOCKER_USE_SUDO,
	volumePath: path.resolve(projectPath, "docker", "db-data-gitignore"),
	volumePathFromContainer: "/var/lib/postgresql/data",
}
