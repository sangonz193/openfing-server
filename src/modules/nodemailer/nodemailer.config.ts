import identity from "lodash/identity";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import * as yup from "yup";

import { validateEnv } from "../../_utils/validateEnv";

let validatedData:
	| {
			NODEMAILER_HOST: string;
			NODEMAILER_PORT: number;
			NODEMAILER_USERNAME: string;
			NODEMAILER_PASSWORD: string;
	  }
	| undefined;

try {
	validatedData = validateEnv({
		NODEMAILER_HOST: yup.string().required(),
		NODEMAILER_PORT: yup.number().required(),
		NODEMAILER_USERNAME: yup.string().required(),
		NODEMAILER_PASSWORD: yup.string().required(),
	});
} catch {}

export const nodemailerConfig = validatedData
	? {
			emailAddress: validatedData.NODEMAILER_USERNAME,
			transportOptions: identity<SMTPTransport.Options>({
				host: validatedData.NODEMAILER_HOST,
				port: validatedData.NODEMAILER_PORT,
				auth: {
					user: validatedData.NODEMAILER_USERNAME,
					pass: validatedData.NODEMAILER_PASSWORD,
				},
			}),
	  }
	: {};
