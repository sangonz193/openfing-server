import path from "path";
import { spawn } from "promisify-child-process";
import { CommandModule } from "yargs";

import { projectPath } from "../../_utils/projectPath";
import { spawnStdio } from "../../_utils/spawnStdio";

const command: CommandModule<{}, {}> = {
	command: "typeorm",

	describe: "Will run the typeorm cli. Pass the arguments after --",

	builder: (yargs) => yargs,

	handler: async () => {
		const argsIndex = process.argv.indexOf("--");

		if (argsIndex === -1) throw new Error("Must specify typeorm arguments after `--`");

		spawn(
			"node",
			[
				...["-r", path.resolve(projectPath, "node_modules", "ts-node", "register")],
				path.resolve(projectPath, "node_modules", "typeorm", "cli.js"),
				...process.argv.slice(argsIndex),
			],
			{
				cwd: projectPath,
				stdio: spawnStdio,
			}
		);
	},
};

export default command;
