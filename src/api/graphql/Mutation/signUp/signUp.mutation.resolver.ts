import { getUuid } from "@sangonz193/utils/getUuid"

import { waitRandom } from "../../../../_utils/waitRandom"
import { appConfig } from "../../../../app/app.config"
import { getEmailValidationEmailContent } from "../../../../authentication/emailValidation/getEmailValidationEmailContent"
import { createEmailValidationToken } from "../../../../authentication/keycloak/createEmailValidationToken"
import { createUser } from "../../../../authentication/keycloak/createUser"
import { getEmailDestinationFromUser } from "../../../../communication/getEmailDestinationFromUser"
import { sendEmail } from "../../../../communication/sendEmail"
import { getGenericErrorParent } from "../../GenericError/GenericError.parent"
import { Resolvers } from "../../schemas.types"
import { getSignUpValidationErrorsParentFromValidationErrors } from "./getSignUpValidationErrorsParentFromValidationErrors"
import { getSignUpEmailNotSentPayloadParent } from "./SignUpEmailNotSentPayload.parent"
import { signUpInputValidationSchema } from "./validateSignUpInput"

const resolver: Resolvers["Mutation"]["signUp"] = async (_, args, context) => {
	const validationResult = await signUpInputValidationSchema.validate(args.input)

	if (!validationResult.success) {
		const errors = validationResult.errors[0].errors
		await waitRandom()

		if (!errors) {
			return getGenericErrorParent()
		}

		return getSignUpValidationErrorsParentFromValidationErrors(errors)
	}

	const input = validationResult.value
	let userWithId: { id: string } | undefined
	try {
		userWithId = await createUser({
			email: input.email,
			firstName: input.firstName,
			lastName: input.lastName ?? undefined,
			keycloakAdminClient: context.keycloakAdminClient.current,
			password: args.input.password,
			emailVerified: false,
		})
	} catch (error: unknown) {
		console.log(error)
		return getGenericErrorParent()
	}

	const user = await context.keycloakAdminClient.current.users.findOne({
		id: userWithId.id,
	})

	if (!user.id || !user.email) {
		return getGenericErrorParent()
	}

	const emailValidation = await context.repositories.emailValidation.insert({
		data: {
			user_id: user.id,
			issued_at: new Date(),
		},
	})

	const validationUrl = `${appConfig.publicUrl}/rest/validate-email?t=${encodeURIComponent(
		createEmailValidationToken(emailValidation.id)
	)}`

	const destination = await getEmailDestinationFromUser(user)
	let emailSent = false

	if (destination) {
		emailSent = (
			await sendEmail({
				destination: destination,
				content: getEmailValidationEmailContent({ validationUrl: validationUrl }),
			})
		).success
	}

	if (emailSent) {
		return null
	}

	const issueId = getUuid()
	console.log("could not send email to:", user.email)
	console.log("issue id:", issueId)

	return getSignUpEmailNotSentPayloadParent({
		issueId: issueId,
	})
}

export default resolver
