import type { Config } from "@jest/types"
import { glob } from "glob"
import path from "path"

import { projectPath } from "../../_utils/projectPath"

const config: Config.InitialOptions = {
	verbose: true,
	testMatch: glob.sync(path.join(projectPath, "src/**/*.test.ts")),
	rootDir: projectPath,
}

export default config
