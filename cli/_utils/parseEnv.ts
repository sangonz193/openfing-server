import dotenv from "dotenv";
import path from "path";

import { fs } from "./fs";
import { projectPath } from "./projectPath";

export const parseEnv = async () => dotenv.parse(await fs.readFile(path.resolve(projectPath, ".env")));
