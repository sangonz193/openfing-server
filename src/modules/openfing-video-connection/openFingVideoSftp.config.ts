import { identity } from "lodash"
import { ConnectConfig } from "ssh2"
import * as yup from "yup"

import { validateEnv } from "../../_utils/validateEnv"

let validatedData:
	| {
			OPEN_FING_VIDEO_SSH_KEY: string
			OPEN_FING_VIDEO_SSH_HOST: string
			OPEN_FING_VIDEO_SSH_USERNAME: string
	  }
	| undefined

try {
	validatedData = validateEnv({
		OPEN_FING_VIDEO_SSH_KEY: yup.string().required(),
		OPEN_FING_VIDEO_SSH_HOST: yup.string().required(),
		OPEN_FING_VIDEO_SSH_USERNAME: yup.string().required(),
	})
} catch {}

export const openFingVideoSftpConfig = {
	connectionOptions: validatedData
		? identity<ConnectConfig>({
				host: validatedData.OPEN_FING_VIDEO_SSH_HOST,
				username: validatedData.OPEN_FING_VIDEO_SSH_USERNAME,
				privateKey: Buffer.from(validatedData.OPEN_FING_VIDEO_SSH_KEY, "base64").toString("utf-8"),
		  })
		: undefined,
}
