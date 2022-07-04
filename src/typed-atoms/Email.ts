import * as yup from "yup"

export type Email = {
	type: "Email"
	value: string
}

export async function getEmail(value: string): Promise<Email | undefined> {
	try {
		return {
			type: "Email",
			value: await yup.string().required().trim().email().validate(value),
		}
	} catch {
		return undefined
	}
}
