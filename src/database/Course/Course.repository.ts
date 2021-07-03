import { getUuid } from "@sangonz193/utils/getUuid"
import { hasProperty } from "@sangonz193/utils/hasProperty"
import identity from "lodash/identity"
import omitBy from "lodash/omitBy"
import { Brackets, Connection } from "typeorm"

import { createUpdate } from "../_utils/createUpdate"
import { getTypedRepository } from "../_utils/getTypedRepository"
import { courseColumns, courseEntitySchema } from "./Course.entity"
import { CourseRow } from "./Course.entity.types"
import { CourseRepository } from "./Course.repository.types"

export const getCourseRepository = (connection: Connection): CourseRepository => {
	const repo = getTypedRepository(courseEntitySchema, connection)
	const update = createUpdate(repo)

	const is: CourseRepository["is"] = (course, options) => {
		if (hasProperty(options, "id") ? course.id !== options.id : course.code !== options.code) {
			return false
		}

		return (
			course.deleted_at === null &&
			(options.includeHidden ||
				course.visibility === "public" ||
				options.includeDisabled ||
				course.visibility === "disabled")
		)
	}

	return {
		_typedRepository: repo,

		findAll: (options = {}) => {
			const queryBuilder = repo.createQueryBuilder("c")

			queryBuilder.andWhere(`c.${courseColumns.deleted_at.name} is null`)

			const { includeDisabled, includeHidden } = options

			if (includeHidden && includeDisabled) {
				// Don't add where conditions
			} else {
				queryBuilder.andWhere(
					new Brackets((queryBuilder) => {
						queryBuilder.andWhere(
							new Brackets((queryBuilder) => {
								queryBuilder.orWhere(`c.${courseColumns.visibility.name} is null`).orWhere(
									`c.${courseColumns.visibility.name} = :visibilityPublic`,
									identity<{ visibilityPublic: CourseRow["visibility"] }>({
										visibilityPublic: "public",
									})
								)
							})
						)

						if (includeHidden) {
							queryBuilder.orWhere(
								`c.${courseColumns.visibility.name} = :visibilityHidden`,
								identity<{ visibilityHidden: CourseRow["visibility"] }>({
									visibilityHidden: "hidden",
								})
							)
						} else if (includeDisabled) {
							queryBuilder.andWhere(
								new Brackets((queryBuilder) => {
									queryBuilder.orWhere(
										`c.${courseColumns.visibility.name} = :visibilityDisabled`,
										identity<{ visibilityDisabled: CourseRow["visibility"] }>({
											visibilityDisabled: "disabled",
										})
									)
								})
							)
						}
					})
				)
			}

			queryBuilder.orderBy(courseColumns.name.name, "ASC")

			return queryBuilder.getMany()
		},

		findBatch: async (options) => {
			const queryBuilder = repo.createQueryBuilder("c")

			const ids: string[] = []
			const codes: string[] = []

			options.forEach((i) => {
				if (hasProperty(i, "id")) {
					ids.push(i.id)
				} else {
					codes.push(i.code)
				}
			})

			queryBuilder.andWhere(`c.${courseColumns.deleted_at.name} is null`)

			queryBuilder.andWhere(
				new Brackets((qb) => {
					if (ids.length) {
						qb.orWhere(
							`c.id in (:...ids)`,
							identity<{ ids: Array<CourseRow["id"]> }>({ ids: [...new Set(ids)] })
						)
					}

					if (codes.length) {
						qb.orWhere(
							`c.code in (:...codes)`,
							identity<{ codes: Array<CourseRow["code"]> }>({ codes: [...new Set(codes)] })
						)
					}
				})
			)

			const result = await queryBuilder.getMany()

			return options.map((options) => result.find((item) => is(item, options)) || null)
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

		update: async (id, newValues) => {
			const acceptedKeysMap = identity<Record<keyof typeof newValues, true>>({
				created_at: true,
				created_by_id: true,
				deleted_at: true,
				deleted_by_id: true,
				name: true,
				code: true,
				eva: true,
				icon_url: true,
				updated_by_id: true,
				visibility: true,
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
