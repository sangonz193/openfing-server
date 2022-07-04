import { _fs } from "@sangonz193/utils/node/fs"
import dotenv from "dotenv"
import path from "path"

import { projectPath } from "./projectPath"

const envFilePath = path.resolve(projectPath, ".env")

if (!_fs.existsSync(envFilePath)) {
	throw new Error(
		`File not found: ${envFilePath}. Please follow the setup instructions in the README.md before continuing.`
	)
}

dotenv.config({
	path: envFilePath,
})
