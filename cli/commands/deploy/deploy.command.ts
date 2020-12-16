import { ChildProcessWithoutNullStreams } from "child_process";
import path from "path";
import SSH2Promise from "ssh2-promise";
import { CommandModule } from "yargs";
import * as yup from "yup";

import { fs } from "../../_utils/fs";
import { projectPath } from "../../_utils/projectPath";
import { uploadRecursive } from "../../_utils/uploadRecursive";

const command: CommandModule<{}, {}> = {
	command: "deploy",

	describe: "Deploys the `dist` folder to `SSH_HOST` server",

	builder: (yargs) => yargs,

	handler: async () => {
		const deployConfig = await yup
			.object({
				SSH_KEY: yup.string().required(),
				SSH_HOST: yup.string().required(),
				SSH_USERNAME: yup.string().required(),
				DESTINATION_PATH: yup.string().required(),
				PM2_PROCESS_NAME: yup.string().required(),
			})
			.required()
			.validate(process.env);

		const ssh = new SSH2Promise({
			host: deployConfig.SSH_HOST,
			username: deployConfig.SSH_USERNAME,
			privateKey: Buffer.from(deployConfig.SSH_KEY, "base64").toString("utf-8"),
		});

		await ssh.connect();
		const sftp = ssh.sftp();

		await ssh.exec(`mkdir -p ${deployConfig.DESTINATION_PATH}`);

		const pm2Config = {
			apps: [
				{
					name: deployConfig.PM2_PROCESS_NAME,
					script: "dist",
					instances: "max",
					exec_mode: "cluster",
					interpreter: path.resolve(deployConfig.DESTINATION_PATH, "node_modules", ".bin", "node"),
					max_restarts: 3,
					min_uptime: "1m",
					env: {
						NODE_ENV: "production",
					},
				},
			],
		};
		const pm2ConfigFilename = "pm2config.json";
		const pm2ConfigPath = path.resolve(projectPath, pm2ConfigFilename);
		await fs.writeFile(pm2ConfigPath, JSON.stringify(pm2Config, undefined, 2));

		const nodesToUpload: Array<string | { from: string; to: string }> = [
			"dist",
			"package.json",
			"package-lock.json",
			{ from: pm2ConfigPath, to: path.resolve(deployConfig.DESTINATION_PATH, pm2ConfigFilename) },
		];

		await ssh.exec(`rm -rfv ${path.resolve(deployConfig.DESTINATION_PATH, "dist")}`);

		await Promise.all(
			nodesToUpload.map(async (nodeToUpload) => {
				const pathToUpload = path.resolve(
					projectPath,
					typeof nodeToUpload === "string" ? nodeToUpload : nodeToUpload.from
				);

				await uploadRecursive({
					fromPath: pathToUpload,
					toPath: path.join(
						deployConfig.DESTINATION_PATH,
						path.relative(projectPath, typeof nodeToUpload === "string" ? nodeToUpload : nodeToUpload.to)
					),
					sftp,
				});
			})
		);

		await fs.unlink(pm2ConfigPath);

		for (const command of [
			"rm -rf node_modules",
			`npm ci`,
			{
				command: `pm2 stop ${deployConfig.PM2_PROCESS_NAME} && pm2 delete ${deployConfig.PM2_PROCESS_NAME}`,
				ignore: true,
			},
			`npx pm2 start ${pm2ConfigFilename}`,
			`npx pm2 start ${pm2ConfigFilename}`, // run twice because, for some reason the first time it runs with an old version of node.
		])
			try {
				console.log(`running`, command);
				const commandSpawn: ChildProcessWithoutNullStreams = await ssh.spawn(
					[
						`cd ${deployConfig.DESTINATION_PATH}`,
						typeof command === "string" ? command : command.command,
					].join(" && ")
				);

				await new Promise((resolve, reject) => {
					commandSpawn.stdout.pipe(process.stdout);
					commandSpawn.stderr.pipe(process.stderr);

					commandSpawn.on("error", reject);
					commandSpawn.on("exit", resolve);
				});
				console.log(`finish`, command);
			} catch (e) {
				console.log(e.toString("utf8"));

				if (typeof command === "string" || !command.ignore) throw e;
			}

		console.log("- done");
		ssh.close();
	},
};

export default command;
