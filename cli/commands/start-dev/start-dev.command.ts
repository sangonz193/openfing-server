import nodemon from "nodemon";
import path from "path";
import { CommandModule } from "yargs";

import { projectPath } from "../../_utils/projectPath";

const command: CommandModule<{}, { watch?: boolean }> = {
	command: "start-dev",

	describe: "Starts the server in development mode",

	builder: (yargs) =>
		yargs.option("watch", {
			alias: "w",
			description: "Starts the server in watch mode. The server will restart when a source file changes",
			type: "boolean",
			demandOption: false,
		}),

	handler: (args) => {
		const scriptPath = path.resolve(projectPath, "src");

		if (!args.watch) require(scriptPath);
		else
			nodemon({
				ignore: [".git", "node_modules"],
				watch: ["src"],
				nodeArgs: ["-r", path.resolve(projectPath, "cli", "_utils", "registerBabel.js")],
				script: scriptPath,
				ext: "ts",
				cwd: projectPath,
			})
				.on("quit", function () {
					console.log("App has quit");
					process.exit();
				})
				.on("restart", function (files) {
					console.log(
						"App restarted due to: ",
						files?.map((file) => path.relative(projectPath, file))
					);
				});
	},
};

export default command;
