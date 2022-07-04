import { hasProperty } from "@sangonz193/utils/hasProperty"
import { isObject } from "lodash"
import * as SibApiV3Sdk from "sib-api-v3-typescript"

import { communicationConfig } from "./communication.config"
import { EmailContent } from "./EmailContent"
import { EmailDestination } from "./EmailDestination"

export type SendEmailOptions = {
	destination: EmailDestination
	content: EmailContent
}

let config:
	| {
			apiInstance: SibApiV3Sdk.TransactionalEmailsApi
			sendInBlueConfig: Extract<typeof communicationConfig.sendInBlue, {}>
	  }
	| undefined

if (communicationConfig.sendInBlue) {
	const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
	apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, communicationConfig.sendInBlue.apiKey)

	config = {
		apiInstance: apiInstance,
		sendInBlueConfig: communicationConfig.sendInBlue,
	}
}

export async function sendEmail(options: SendEmailOptions): Promise<{ success: boolean }> {
	if (!config) {
		console.log("Email not sent:")
		console.log(options.content.html)
		return {
			success: false,
		}
	}

	const { apiInstance, sendInBlueConfig } = config

	try {
		await apiInstance.sendTransacEmail({
			sender: {
				name: "OpenFING",
				email: sendInBlueConfig.senderAddress,
			},
			htmlContent: options.content.html,
			subject: options.content.subject,
			to: [{ email: options.destination.email.value, name: options.destination.name }],
		})
	} catch (error: unknown) {
		console.log("Email not sent:", options.content.html)
		console.log(...(isObject(error) && hasProperty(error, "message") ? [error?.message] : []), error)

		return {
			success: false,
		}
	}

	return {
		success: true,
	}
}
