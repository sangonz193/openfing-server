import dotenv from "dotenv";
import path from "path";

import { _fs } from "./fs";
import { projectPath } from "./projectPath";

const envFilePath = path.resolve(projectPath, ".env");

if (!_fs.existsSync(envFilePath)) throw new Error(`File not found: ${envFilePath}`);

dotenv.config({
	path: envFilePath,
});
