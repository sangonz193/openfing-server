import { getUuid } from "@sangonz193/utils/getUuid"
import { identityMap } from "@sangonz193/utils/identityMap"
import identity from "lodash/identity"
import omitBy from "lodash/omitBy"
import { Connection } from "typeorm"

import { createUpdate } from "../_utils/createUpdate"
import { getTypedRepository } from "../_utils/getTypedRepository"
import { postColumns, postEntitySchema } from "./Post.entity"
import { PostRepository } from "./Post.repository.types"

export const getPostRepository = (connection: Connection): PostRepository => {
	const tableName = "post"
	const repo = getTypedRepository(postEntitySchema, connection)
	const update = createUpdate(repo)

	const is: PostRepository["is"] = (post, options) => {
		return post.id === options.id && post.deleted_at === null
	}

	return {
		_typedRepository: repo,

		async findOne(options) {
			return (await this.findBatch([options]))[0]
		},

		findBatch: async (options) => {
			const queryBuilder = repo.createQueryBuilder(tableName)

			queryBuilder
				.andWhere(`${tableName}.${postColumns.deleted_at.name} is null`)
				.andWhereInIds(options.map((options) => options.id))

			const courseClasses = await queryBuilder.getMany()

			return options.map((options) => courseClasses.find((cc) => is(cc, options)) || null)
		},

		findAllAndCount: async (options) => {
			const queryBuilder = repo.createQueryBuilder(tableName)

			queryBuilder.andWhere(`${tableName}.${postColumns.deleted_at.name} is null`)
			queryBuilder.orderBy(postColumns.published_at.name, options.order ?? "DESC")
			queryBuilder.take(options.limit ?? 10)

			const countPromise = queryBuilder.clone().getCount()

			if (options.publishedAfter) {
				queryBuilder.andWhere(
					`${tableName}.${postColumns.published_at.name} > :publishedAfter`,
					identity<{ publishedAfter: Date }>({
						publishedAfter: options.publishedAfter,
					})
				)
			}

			queryBuilder.take(options.limit ?? 10)

			return [await queryBuilder.getMany(), await countPromise]
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
			const acceptedKeysMap = identityMap<keyof typeof newValues>({
				created_at: 0,
				created_by_id: 0,
				updated_by_id: 0,
				deleted_at: 0,
				deleted_by_id: 0,
				content: 0,
				content_html: 0,
				published_at: 0,
				short_content: 0,
				title: 0,
			})

			return update(id, {
				...omitBy(newValues, (_, key) => {
					return !acceptedKeysMap[key as keyof typeof acceptedKeysMap]
				}),
				updated_at: new Date(),
			})
		},

		delete(id, data) {
			return update(id, {
				deleted_at: new Date(),
				deleted_by_id: data.deleted_by_id,
			})
		},
	}
}
