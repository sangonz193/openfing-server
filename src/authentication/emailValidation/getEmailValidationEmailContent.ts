import { EmailContent } from "../../communication/EmailContent"

export function getEmailValidationEmailContent({ validationUrl }: { validationUrl: string }): EmailContent {
	return {
		subject: `Registro de usuario OpenFING`,
		html: `Te mandamos este correo porque te has registrado en OpenFING. Para completar el registro, por favor visita <a href="${validationUrl}">${validationUrl}</a>`,
	}
}
