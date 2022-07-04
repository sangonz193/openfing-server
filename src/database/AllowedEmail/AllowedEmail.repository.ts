import { getUuid } from "@sangonz193/utils/getUuid"
import { Connection } from "typeorm"

import { getTypedRepository } from "../_utils/getTypedRepository"
import { allowedEmailEntitySchema } from "."
import { AllowedEmailEntitySchema } from "./AllowedEmail.entity.types"
import { AllowedEmailRepository } from "./AllowedEmail.repository.types"

export const getAllowedEmailRepository = (connection: Connection): AllowedEmailRepository => {
	const repo = getTypedRepository<AllowedEmailEntitySchema>(allowedEmailEntitySchema, connection)

	return {
		findAll: () => {
			const queryBuilder = repo.createQueryBuilder()
			return queryBuilder.getMany()
		},

		findOne: (options) => {
			const queryBuilder = repo.createQueryBuilder().where({
				email: options.emailAddress,
			})
			return queryBuilder.getOne().then((allowedEmail) => allowedEmail ?? null)
		},

		createAndSave: (data) =>
			repo.save({
				...data,
				id: data.id ?? getUuid(),
			}),

		delete: async ({ email }) => {
			await repo.delete({
				email_address: email,
			})
		},
	}
}
