import * as yup from "yup";

let validatedData:
	| {
			OPEN_FING_VIDEO_SSH_KEY: string;
			OPEN_FING_VIDEO_SSH_HOST: string;
			OPEN_FING_VIDEO_SSH_USERNAME: string;
	  }
	| undefined;

try {
	validatedData = yup
		.object({
			OPEN_FING_VIDEO_SSH_KEY: yup.string().required(),
			OPEN_FING_VIDEO_SSH_HOST: yup.string().required(),
			OPEN_FING_VIDEO_SSH_USERNAME: yup.string().required(),
		})
		.required()
		.validateSync(process.env, {
			stripUnknown: true,
		});
} catch {}

export const openFingVideoSftpConfig = {
	connectionOptions: validatedData
		? {
				host: validatedData.OPEN_FING_VIDEO_SSH_HOST,
				username: validatedData.OPEN_FING_VIDEO_SSH_USERNAME,
				privateKey: Buffer.from(validatedData.OPEN_FING_VIDEO_SSH_KEY, "base64").toString("utf-8"),
		  }
		: undefined,
};
