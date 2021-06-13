import { run } from "jest"
import path from "path"
import { CommandModule } from "yargs"

import { projectPath } from "../../_utils/projectPath"

const command: CommandModule<{}, {}> = {
	command: "test",

	describe: false,

	handler: async () => {
		run(["--config", path.resolve(__dirname, "jest.config.ts")], projectPath)
	},
}

export default command
