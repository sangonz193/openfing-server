import { appConfig } from "../../../../config/app.config"
import { createEmailValidationToken } from "../../../../modules/keycloak/createEmailValidationToken"
import { createUser } from "../../../../modules/keycloak/createUser"
import { getNodemailerTransporter } from "../../../../modules/nodemailer/getNodemailerTransporter"
import { getUserFromSecret } from "../../_utils/getUserFromSecret"
import { getGenericErrorParent } from "../../GenericError/GenericError.parent"
import { Resolvers } from "../../schemas.types"
import { validateSignUpInput } from "./validateSignUpInput"

const resolver: Resolvers["Mutation"]["signUp"] = async (_, args, context) => {
	const userFromSecret = await getUserFromSecret(args.secret, context)

	if (!userFromSecret) {
		return getGenericErrorParent()
	}

	const validationResult = await validateSignUpInput(args)

	if (!validationResult.success) {
		return validationResult.errors
	}

	const { input } = validationResult
	let userWithId: { id: string } | undefined
	try {
		userWithId = await createUser({
			email: input.email,
			firstName: input.firstName,
			lastName: input.lastName ?? undefined,
			keycloakAdminClient: context.keycloakAdminClient.current,
			password: args.input.password,
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

	const transporter = getNodemailerTransporter()
	const validationUrl = `${appConfig.publicUrl}/rest/validate-email?t=${encodeURIComponent(
		createEmailValidationToken(emailValidation.id)
	)}`

	transporter
		?.sendMail({
			to: user.email,
			subject: "Registro de usuario OpenFING",
			text: `Te mandamos este correo porque te has registrado en OpenFING. Para completar el registro, por favor visita ${validationUrl}`,
			html: `Te mandamos este correo porque te has registrado en OpenFING. Para completar el registro, por favor visita <a href="${validationUrl}">${validationUrl}</a>`,
		})
		.catch((error) => {
			console.log(error)
		})

	return null
}

export default resolver
