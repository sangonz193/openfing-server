import * as path from "path";
import urlJoin from "url-join";
import * as yup from "yup";

import { getDbConnectionOptions } from "./config/getDbConnectionOptions";

const validatedEnv = yup
	.object({
		GRAPHQL_PATH: yup.string().required().min(1),
		FILES_PATH: yup.string().required().min(1),
		FILES_URL: yup.string().required().min(1),
		DATABASE_BACKUP_REPO_PATH: yup.string(),
		ACCESS_TOKEN_SECRET: yup.string().required().min(1),
		ACCESS_TOKEN_DURATION: yup.string().required().min(1),
		REFRESH_TOKEN_SECRET: yup.string().required().min(1),
		REFRESH_TOKEN_DURATION: yup.string().required().min(1),
		HOST: yup.string().default("localhost").required(),
		PORT: yup.number().required().integer(),
		WRITE_DB_PORT: yup.number().required().integer(),
	})
	.required()
	.validateSync(process.env, {
		stripUnknown: true,
	});

validatedEnv.FILES_PATH = path.join("/", ...validatedEnv.FILES_PATH.split("/"));

const ASSETS_PATH = path.join(validatedEnv.FILES_PATH, "assets");
const ASSETS_URL = urlJoin(validatedEnv.FILES_URL, "assets");

const COURSE_ICONS_PATH = path.join(ASSETS_PATH, "course-icons");
const COURSE_ICONS_URL = urlJoin(ASSETS_URL, "course-icons");

export const appConfig = {
	dbConnectionOptions: getDbConnectionOptions(),

	...validatedEnv,

	ASSETS_PATH,
	ASSETS_URL,

	COURSE_ICONS_PATH,
	COURSE_ICONS_URL,

	DEFAULT_COURSE_ICON_FILE_PATH: path.join(COURSE_ICONS_PATH, "default-icon.svg"),
	DEFAULT_COURSE_ICON_URL: urlJoin(COURSE_ICONS_URL, "default-icon.svg"),

	LOGGER_PATH: path.resolve(__dirname, "logs"),
};
