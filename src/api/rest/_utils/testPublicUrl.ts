import axios from "axios"
import chalk from "chalk"

import { appConfig } from "../../../app/app.config"
import { testUuid } from "../test/test.endpoint"

export async function testPublicUrl() {
	const response = await axios.get(`${appConfig.publicUrl}/rest/test`).catch((error) => {
		console.log(error)
		return null
	})

	if (response?.data === testUuid) {
		return
	}

	console.log(chalk.red(`Error: \`PUBLIC_URL="${appConfig.publicUrl}"\` is not correct.`))
}
