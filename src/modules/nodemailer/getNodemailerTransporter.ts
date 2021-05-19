import { createTransport, Transporter } from "nodemailer";

import { nodemailerConfig } from "./nodemailer.config";

export function getNodemailerTransporter(): Transporter | undefined {
	return (
		nodemailerConfig.transportOptions &&
		createTransport(nodemailerConfig.transportOptions, {
			from: `"OpenFING" <${nodemailerConfig.emailAddress}>`,
		})
	);
}
