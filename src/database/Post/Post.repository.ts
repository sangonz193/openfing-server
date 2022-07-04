import { getUuid } from "@sangonz193/utils/getUuid"
import { isAfter } from "date-fns"
import identity from "lodash/identity"
import { Connection } from "typeorm"

import { getTypedRepository } from "../_utils/getTypedRepository"
import { postColumns, postEntitySchema } from "./Post.entity"
import { PostEntitySchema, PostRow } from "./Post.entity.types"
import { PostRepository } from "./Post.repository.types"

export const getPostRepository = (connection: Connection): PostRepository => {
	const repo = getTypedRepository<PostEntitySchema>(postEntitySchema, connection)

	const is: PostRepository["is"] = (post, options) => {
		return (
			post.id === options.id &&
			post.deleted_at === null &&
			(options.includeDrafts || (!!post.published_at && isAfter(post.published_at, new Date())))
		)
	}

	return {
		_typedRepository: repo,

		findAll: (options) => {
			const queryBuilder = repo.createQueryBuilder("p")

			queryBuilder
				.andWhere(`p.${postColumns.deleted_at.name} is null`)
				.orderBy(postColumns.published_at.name, "DESC")

			if (!options.includeDrafts) {
				queryBuilder.andWhere(`p.${postColumns.published_at.name} is not null`)
			}

			return queryBuilder.getMany()
		},

		findBatch: async (options) => {
			const queryBuilder = repo.createQueryBuilder("p")

			queryBuilder
				.andWhere(`p.${postColumns.deleted_at.name} is null`)
				.whereInIds(identity<Array<PostRow["id"]>>(options.map((o) => o.id)))

			const courseEditions = await queryBuilder.getMany()

			return options.map((options) => courseEditions.find((ce) => is(ce, options)) || null)
		},

		is,

		create: (data) => ({
			...data,
			id: data.id ?? getUuid(),
			created_at: data.created_at || new Date(),
			updated_at: data.updated_at || null,
			deleted_at: data.deleted_at || null,
			updated_by_id: data.updated_by_id || null,
			deleted_by_id: data.deleted_by_id || null,
		}),

		insert: (data) => repo.save(data),

		createAndInsert(...args) {
			return this.insert(this.create(...args))
		},

		async update(id, newValues) {
			return repo.save({ ...newValues, id })
		},

		delete(id, data) {
			return this.update(id, {
				deleted_at: new Date(),
				deleted_by_id: data.deleted_by_id,
			})
		},
	}
}
