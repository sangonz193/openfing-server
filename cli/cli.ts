import path from "path"
import yargs, { CommandModule } from "yargs"

import { getMatchingFilePathsSync } from "./_utils/getMatchingFilePaths"

const run = async () => {
	const commandsDirPath = path.resolve(__dirname, "commands")
	const possibleCommandName = process.argv[2]

	let matchingFiles = getMatchingFilePathsSync(
		path.resolve(commandsDirPath, "**", `${possibleCommandName}.command.ts`)
	)

	if (matchingFiles.length !== 1) {
		matchingFiles = getMatchingFilePathsSync(path.resolve(commandsDirPath, "**", `*.command.ts`))
	}

	const commands = matchingFiles.map<CommandModule<unknown, unknown>>((matchingFilePath) => {
		return require(matchingFilePath).default
	})

	const _yargs = yargs.scriptName("node cli")

	commands.forEach((command) => _yargs.command(command))

	_yargs.locale("en_US").parserConfiguration({ "camel-case-expansion": false }).showHelpOnFail(false).strict().argv
}

run()
