import { Connection } from "typeorm";

import { getTypedRepository } from "../../entities/_utils/getTypedRepository";
import { faqColumns, faqEntitySchema } from "../../entities/Faq";
import { FaqEntitySchema } from "../../entities/Faq/Faq.entity.types";
import { FaqRepository } from "./Faq.repository.types";

export const getFaqRepository = (connection: Connection): FaqRepository => {
	const repo = getTypedRepository<FaqEntitySchema>(faqEntitySchema, connection);

	return {
		_typedRepository: repo,

		findAll: () => {
			const queryBuilder = repo.createQueryBuilder("f");

			queryBuilder.andWhere(`f.${faqColumns.deleted_at.name} is null`).orderBy(faqColumns.position.name, "ASC");

			return queryBuilder.getMany();
		},

		create: (data) => ({
			...data,
			created_at: data.created_at || new Date(),
			updated_at: data.updated_at || null,
			deleted_at: data.deleted_at || null,
			updated_by_id: data.updated_by_id || null,
			deleted_by_id: data.deleted_by_id || null,
		}),

		save: (data) => repo.save(data),
	};
};
