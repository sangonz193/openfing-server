import * as yup from "yup"

import { validateEnv } from "../_utils/validateEnv"

let env:
	| {
			SEND_IN_BLUE_API_KEY: string
			SEND_IN_BLUE_SENDER_ADDRESS: string
	  }
	| undefined

try {
	env = validateEnv({
		SEND_IN_BLUE_API_KEY: yup.string().required().min(1),
		SEND_IN_BLUE_SENDER_ADDRESS: yup.string().required().min(1),
	})
} catch (error: unknown) {}

export const communicationConfig = {
	sendInBlue: env
		? {
				apiKey: env.SEND_IN_BLUE_API_KEY,
				senderAddress: env.SEND_IN_BLUE_SENDER_ADDRESS,
		  }
		: undefined,
}
