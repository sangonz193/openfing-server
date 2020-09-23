import path from "path";
import { spawn } from "promisify-child-process";

import { parseEnv } from "./_utils/parseEnv";
import { projectPath } from "./_utils/projectPath";
import { spawnStdio } from "./_utils/spawnStdio";

(async () => {
	spawn(
		path.resolve(projectPath, "node_modules", "node", "bin", "node"),
		[
			...["-r", path.resolve(projectPath, "cli", "_utils", "registerBabel.js")],
			path.resolve(projectPath, "cli", "cli.ts"),
			...process.argv.slice(2),
		],
		{
			stdio: spawnStdio,
			env: { ...process.env, ...(await parseEnv().catch(() => ({}))) },
		}
	).catch(() => null);
})();
