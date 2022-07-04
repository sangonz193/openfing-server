import path from "path"
import urlJoin from "url-join"
import * as yup from "yup"

import { validateEnv } from "../_utils/validateEnv"
import { isProduction } from "./isProduction.config"
import { resolveEnvLocalPathTransform } from "./resolveEnvLocalPathTransform"

const validatedEnv = validateEnv({
	HOST: yup.string().default("localhost").required(),
	PORT: yup.number().required().integer(),
	FILES_PATH: yup.string().required().min(1).transform(resolveEnvLocalPathTransform),
	FILES_URL: yup.string().required().min(1),
	PUBLIC_URL: yup.string().required().min(1),
	FRONT_END_URL: yup.string().required().min(1),
})

const ASSETS_PATH = path.join(validatedEnv.FILES_PATH, "assets")
const ASSETS_URL = urlJoin(validatedEnv.FILES_URL, "assets")

const COURSE_ICONS_PATH = path.join(ASSETS_PATH, "course-icons")
const COURSE_ICONS_URL = urlJoin(ASSETS_URL, "course-icons")

export const appConfig = {
	host: validatedEnv.HOST,
	port: validatedEnv.PORT,

	assets: {
		defaultCourseIcon: {
			path: path.join(COURSE_ICONS_PATH, "default-icon.svg"),
			url: urlJoin(COURSE_ICONS_URL, "default-icon.svg"),
		},
	},

	isProduction: isProduction,

	publicUrl: validatedEnv.PUBLIC_URL.replace(/\/$/, ""),

	frontEndUrl: validatedEnv.FRONT_END_URL.replace(/\/$/, ""),
}
