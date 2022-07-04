import { appConfig } from "../../../app/app.config"
import { getEmailValidationIdFromEmailValidationToken } from "../../../authentication/keycloak/getUserIdFromEmailValidationToken"
import { RestEndpoint } from "../RestEndpoint"

const handler: RestEndpoint["handler"] = async (context) => {
	const sendResponse = (success: boolean) => {
		const { res } = context
		res.set("Content-Type", "text/html")
		res.send(
			Buffer.from(
				success
					? [
							`<div style="display:flex;flex-direction:column;">`,
							[
								//
								`<span style="margin-bottom:20px">El email ha quedado validado.</span>`,
								`<a href="${appConfig.frontEndUrl}">Ir a OpenFING.</a>`,
							],
							`</div>`,
					  ]
							.flat(Number.MAX_SAFE_INTEGER)
							.join("")
					: "No se pudo validar el email."
			)
		)
	}

	const token = context.req.query.t
	if (typeof token !== "string") {
		console.log("token not a string", JSON.stringify(token))
		sendResponse(false)
		return
	}

	const emailValidationId = getEmailValidationIdFromEmailValidationToken(decodeURIComponent(token))
	if (!emailValidationId) {
		console.log("emailValidationId not found", emailValidationId)
		sendResponse(false)
		return
	}

	const emailValidation = await context.dataLoaders.emailValidation.find.load({ id: emailValidationId })
	if (!emailValidation) {
		console.log("emailValidation not found", emailValidation)
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
