import { SafeOmit } from "@sangonz193/utils/SafeOmit"
import { PoolConfig } from "pg"
import * as yup from "yup"

import { validateEnv } from "../_utils/validateEnv"

const validatedEnv = validateEnv({
	DB_NAME: yup.string().trim().required(),
	DB_HOST: yup.string().trim().required(),
	DB_PORT: yup.number().integer().required(),
	DB_USERNAME: yup.string().trim().required(),
	DB_PASSWORD: yup.string().trim().required(),
})

export const databasePoolConfig: SafeOmit<PoolConfig, "database" | "password"> & {
	password: string
	database: string
} = {
	database: validatedEnv.DB_NAME,
	host: validatedEnv.DB_HOST,
	port: validatedEnv.DB_PORT,
	user: validatedEnv.DB_USERNAME,
	password: validatedEnv.DB_PASSWORD,
}
