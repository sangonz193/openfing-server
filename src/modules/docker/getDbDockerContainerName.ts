import { exec } from "promisify-child-process"

import { projectPath } from "../../_utils/projectPath"
import { dockerConfig } from "./docker.config"

export async function getDbDockerContainerName(): Promise<string | null> {
	const _dockerPsOutput = (
		await exec(`${dockerConfig.useSudo ? "sudo " : ""}docker-compose ps`, {
			cwd: projectPath,
		}).catch((e) => {
			console.log("Error: ", e)
			throw e
		})
	).stdout

	const dockerPsOutput =
		_dockerPsOutput && _dockerPsOutput instanceof Buffer ? _dockerPsOutput.toString("utf8") : _dockerPsOutput

	if (typeof dockerPsOutput !== "string") {
		console.log("unexpected dockerPsOutput:", dockerPsOutput)
		return null
	}

	const [, dbContainerName] = dockerPsOutput.match(/^([^ \n]+_db[^ ]*)/m) || []

	return dbContainerName ?? null
}
