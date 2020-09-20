import dotenv from "dotenv";
import path from "path";

import { _fs, fs } from "./fs";
import { projectPath } from "./projectPath";

const envFilePath = path.resolve(projectPath, ".env");

if (!_fs.existsSync(envFilePath)) throw new Error(`File not found: ${envFilePath}`);

export const parseEnv = async () => dotenv.parse(await fs.readFile(envFilePath));
