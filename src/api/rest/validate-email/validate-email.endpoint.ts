import { getEmailValidationIdFromEmailValidationToken } from "../../../modules/keycloak/getUserIdFromEmailValidationToken"
import { RestEndpoint } from "../RestEndpoint"

const handler: RestEndpoint["handler"] = async (context) => {
	const sendResponse = (success: boolean) => {
		context.res.send(success ? "El email ha quedado validado." : "No se pudo validar el email.")
	}

	const token = context.req.query.t
	if (typeof token !== "string") {
		sendResponse(false)
		return
	}

	const emailValidationId = getEmailValidationIdFromEmailValidationToken(token)
	if (!emailValidationId) {
		sendResponse(false)
		return
	}

	const emailValidation = await context.dataLoaders.emailValidation.find.load(emailValidationId)
	if (!emailValidation) {
		sendResponse(false)
		return
	}

	try {
		await context.keycloakAdminClient.current.users.update(
			{
				id: emailValidation.user_id,
			},
			{
				emailVerified: true,
			}
		)
		sendResponse(true)
		context.repositories.emailValidation.delete({ userId: emailValidation.user_id })
	} catch (error: unknown) {
		sendResponse(false)
		console.log(error)
	}
}

const endpoint: RestEndpoint = {
	httpMethod: "get",
	handler,
}

export default endpoint
