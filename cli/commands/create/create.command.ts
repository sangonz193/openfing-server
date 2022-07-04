import path from "path"
import type { CommandModule } from "yargs"

import { getSubCommandsPaths } from "../../_utils/getSubCommandsPaths"
import { runPlopInterface } from "../../_utils/runPlopInterface"
import { createPlopFilePath } from "./plop/plopfile.path"

const command: CommandModule<{}, {}> = {
	command: "create",

	describe: "Runs the plop interface.",

	builder: (yargs) => {
		const commandsFolderPath = path.resolve(__dirname, "commands")
		getSubCommandsPaths(commandsFolderPath).forEach((command) => yargs.command(require(command).default))

		return yargs
	},

	handler: () => {
		runPlopInterface({
			plopFilePath: createPlopFilePath,
		})
	},
}

export default command
