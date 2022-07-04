import { head } from "lodash"

import { waitRandom } from "../../../../_utils/waitRandom"
import { appConfig } from "../../../../app/app.config"
import { getEmailValidationEmailContent } from "../../../../authentication/emailValidation/getEmailValidationEmailContent"
import { createEmailValidationToken } from "../../../../authentication/keycloak/createEmailValidationToken"
import { getEmailDestinationFromUser } from "../../../../communication/getEmailDestinationFromUser"
import { sendEmail } from "../../../../communication/sendEmail"
import { getGenericErrorParent } from "../../GenericError/GenericError.parent"
import { Resolvers } from "../../schemas.types"
import { getSendVerifyEmailPayloadParent } from "./SendVerifyEmailPayload.parent"

const resolver: Resolvers["Mutation"]["sendVerifyEmail"] = async (_, args, context) => {
	const userWithEmail = head(await context.keycloakAdminClient.current.users.find({ email: args.input.email }))

	if (!userWithEmail || !userWithEmail.id) {
		await waitRandom()
		console.log("User with email not found:", args.input.email)
		return getSendVerifyEmailPayloadParent()
	}

	if (userWithEmail.emailVerified) {
		await waitRandom()
		return getGenericErrorParent()
	}

	const userId = userWithEmail.id
	console.log(`Looking for validation for ${userId}.`)
	let emailValidation = await context.dataLoaders.emailValidation.find.load({
		userId: userId,
	})

	if (!emailValidation) {
		console.log(`Email validation for user "${userId}" not found.`)
		emailValidation = await context.repositories.emailValidation.insert({
			data: {
				user_id: userId,
				issued_at: new Date(),
			},
		})
	}
	console.log(`Validation ${emailValidation.id}.`)

	const validationUrl = `${appConfig.publicUrl}/rest/validate-email?t=${encodeURIComponent(
		createEmailValidationToken(emailValidation.id)
	)}`

	const destination = await getEmailDestinationFromUser(userWithEmail)
	if (destination) {
		const { success: emailSent } = await sendEmail({
			destination: destination,
			content: getEmailValidationEmailContent({ validationUrl: validationUrl }),
		})

		if (!emailSent) {
			return getGenericErrorParent()
		}
	}

	return getSendVerifyEmailPayloadParent()
}

export default resolver
