import path from "path"

import { projectPath } from "../_utils/projectPath"

const envFilePath = path.resolve(projectPath, ".env")

export function resolveEnvLocalPathTransform(value: string): string {
	return path.resolve(envFilePath, value)
}

export function resolveOptionalEnvLocalPathTransform(value: string | undefined): string | undefined {
	if (!value) {
		return value
	}

	return resolveEnvLocalPathTransform(value)
}
