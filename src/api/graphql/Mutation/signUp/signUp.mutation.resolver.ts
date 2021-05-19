import { appConfig } from "../../../../config/app.config";
import { createEmailValidationToken } from "../../../../modules/keycloak/createEmailValidationToken";
import { getNodemailerTransporter } from "../../../../modules/nodemailer/getNodemailerTransporter";
import { getUserFromSecret } from "../../_utils/getUserFromSecret";
import { getGenericErrorParent } from "../../GenericError/GenericError.parent";
import { Resolvers } from "../../schemas.types";
import { validateSignUpInput } from "./validateSignUpInput";

const resolver: Resolvers["Mutation"]["signUp"] = async (_, args, context) => {
	const userFromSecret = await getUserFromSecret(args.secret, context);

	if (!userFromSecret) {
		return getGenericErrorParent();
	}

	const validationResult = await validateSignUpInput(args);

	if (!validationResult.success) {
		return validationResult.errors;
	}

	const { input } = validationResult;
	const userWithId = await context.keycloakAdminClient.users
		.create({
			firstName: input.firstName,
			lastName: input.lastName ?? undefined,
			email: input.email,
			username: input.email,
			credentials: [
				{
					temporary: false,
					type: "password",
					value: args.input.password,
				},
			],
		})
		.catch((error) => {
			console.log(error);
			throw error;
		});

	const user = await context.keycloakAdminClient.users.findOne({
		id: userWithId.id,
	});

	if (!user.id || !user.email) {
		return getGenericErrorParent();
	}

	const transporter = getNodemailerTransporter();
	const validationUrl = `${appConfig.frontEndUrl}/validate-email?t=${encodeURIComponent(
		createEmailValidationToken(user.id)
	)}`;

	transporter
		?.sendMail({
			to: user.email, // list of receivers
			subject: "Registro de usuario OpenFING", // Subject line
			text: `Te mandamos este correo porque te has registrado en OpenFING. Para completar el registro, por favor visita ${validationUrl}`,
			html: `Te mandamos este correo porque te has registrado en OpenFING. Para completar el registro, por favor visita <a href="${validationUrl}">${validationUrl}</a>`,
		})
		.catch((error) => {
			console.log(error);
		});

	return null;
};

export default resolver;
