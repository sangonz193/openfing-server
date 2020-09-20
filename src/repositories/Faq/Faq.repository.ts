import { Connection } from "typeorm";

import { getUuid } from "../../_utils/getUuid";
import { getTypedRepository } from "../../entities/_utils/getTypedRepository";
import { Faq, faqColumns } from "../../entities/Faq";
import { FaqRepository } from "./Faq.repository.types";

export const getFaqRepository = (connection: Connection): FaqRepository => {
	const repo = getTypedRepository(Faq, connection);

	return {
		_typedRepository: repo,

		findAll: () => {
			const queryBuilder = repo.createQueryBuilder("f");

			queryBuilder.andWhere(`f.${faqColumns.deletedAt.name} is null`).orderBy(faqColumns.position.name, "ASC");

			return queryBuilder.getMany();
		},

		create: (data) => ({
			...data,
			id: data.id ?? getUuid(),
			createdAt: data.createdAt === undefined ? new Date() : data.createdAt,
			updatedAt: data.updatedAt || null,
			deletedAt: data.deletedAt || null,
			updatedById: data.updatedById || null,
			deletedById: data.deletedById || null,
		}),

		save: (data) => repo.save(data),
	};
};
