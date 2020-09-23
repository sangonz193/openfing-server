import * as path from "path";
import { ConnectionOptions } from "typeorm";
import urlJoin from "url-join";

import { entities } from "./entities";

const { env } = process;
const {
	FILES_URL,
	DATABASE_BACKUP_REPO_PATH,
	ACCESS_TOKEN_SECRET,
	ACCESS_TOKEN_DURATION,
	REFRESH_TOKEN_SECRET,
	REFRESH_TOKEN_DURATION,
	WRITE_DB_HOST,
	WRITE_DB_NAME,
	WRITE_DB_USERNAME,
	WRITE_DB_PASSWORD,
} = env;

if (!env.FILES_PATH) throw new Error("FILES_PATH not defined");
const FILES_PATH = path.join("/", ...env.FILES_PATH.split("/"));

if (!FILES_URL) throw new Error("FILES_URL not defined");

if (!ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET variable not defined");
if (!ACCESS_TOKEN_DURATION) throw new Error("ACCESS_TOKEN_DURATION variable not defined");

if (!REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET variable not defined");
if (!REFRESH_TOKEN_DURATION) throw new Error("REFRESH_TOKEN_DURATION variable not defined");

const HOST = env.HOST || "localhost";
if (!env.HOST) console.log(`Using default HOST: \`${HOST}\``);

if (!env.PORT) throw new Error("PORT variable not defined");
const PORT = Number(env.PORT);
if (!PORT) throw new Error("Invalid PORT value. Must be number");

if (!WRITE_DB_HOST) throw new Error("WRITE_DB_HOST variable not defined");

if (!env.WRITE_DB_PORT) throw new Error("WRITE_DB_PORT variable not defined");
const WRITE_DB_PORT = Number(env.WRITE_DB_PORT);
if (!WRITE_DB_PORT) throw new Error("Invalid WRITE_DB_PORT value. Must be number");

if (!WRITE_DB_NAME) throw new Error("WRITE_DB_NAME variable not defined");
if (!WRITE_DB_USERNAME) throw new Error("WRITE_DB_USERNAME variable not defined");
if (!WRITE_DB_PASSWORD) throw new Error("WRITE_DB_PASSWORD variable not defined");

const ASSETS_PATH = path.join(FILES_PATH, "assets");
const ASSETS_URL = urlJoin(FILES_URL, "assets");

const COURSE_ICONS_PATH = path.join(ASSETS_PATH, "course-icons");
const COURSE_ICONS_URL = urlJoin(ASSETS_URL, "course-icons");

const isProduction = process.env.NODE_ENV === "production";

const dbConnectionOptions: ConnectionOptions = {
	type: "postgres",
	database: WRITE_DB_NAME,
	host: WRITE_DB_HOST,
	port: WRITE_DB_PORT,
	username: WRITE_DB_USERNAME,
	password: WRITE_DB_PASSWORD,
	schema: "openfing",
	entities: Object.values(entities),
	logging: !isProduction,
	migrations: [isProduction ? "dist/migrations/*.js" : "src/migrations/*.ts"],
	cli: {
		migrationsDir: "src/migrations",
	},
};

export const appConfig = {
	dbConnectionOptions,

	FILES_PATH,
	FILES_URL,

	DATABASE_BACKUP_REPO_PATH,

	ASSETS_PATH,
	ASSETS_URL,

	COURSE_ICONS_PATH,
	COURSE_ICONS_URL,

	DEFAULT_COURSE_ICON_FILE_PATH: path.join(COURSE_ICONS_PATH, "default-icon.svg"),
	DEFAULT_COURSE_ICON_URL: urlJoin(COURSE_ICONS_URL, "default-icon.svg"),

	ACCESS_TOKEN_SECRET,
	ACCESS_TOKEN_DURATION,

	REFRESH_TOKEN_SECRET,
	REFRESH_TOKEN_DURATION,

	HOST,
	PORT,

	LOGGER_PATH: path.resolve(__dirname, "logs"),
};
