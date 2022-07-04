import * as yup from "yup"

import { validateEnv } from "../../../_utils/validateEnv"

const validatedEnv = validateEnv({
	DISABLED_COURSE_CLASS_VIDEO_ENCRYPTION_KEY: yup.string().notRequired(),
})

export const courseClassVideoNameEncryption = {
	disabledCourseClassVideoEncryptionKey: validatedEnv.DISABLED_COURSE_CLASS_VIDEO_ENCRYPTION_KEY,
}
