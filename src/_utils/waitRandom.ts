import { wait } from "@sangonz193/utils/wait"

export async function waitRandom() {
	await wait(Math.floor(Math.random() * 1000) + 500)
}
