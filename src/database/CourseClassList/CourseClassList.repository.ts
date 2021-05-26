import { getUuid } from "@sangonz193/utils/getUuid"
import { hasProperty } from "@sangonz193/utils/hasProperty"
import identity from "lodash/identity"
import { Connection } from "typeorm"

import { getTypedRepository } from "../_utils/getTypedRepository"
import { courseClassListColumns, courseClassListEntitySchema } from "./CourseClassList.entity"
import { CourseClassListRow } from "./CourseClassList.entity.types"
import { CourseClassListRepository } from "./CourseClassList.repository.types"

export const getCourseClassListRepository = (connection: Connection): CourseClassListRepository => {
	const repo = getTypedRepository(courseClassListEntitySchema, connection)

	const is: CourseClassListRepository["is"] = (courseClassList, options) => {
		if (hasProperty(options, "id") ? courseClassList.id !== options.id : courseClassList.code !== options.code) {
			return false
		}

		return (
			courseClassList.deleted_at === null &&
			(options.includeHidden ||
				courseClassList.visibility === "public" ||
				options.includeDisabled ||
				courseClassList.visibility === "disabled")
		)
	}

	return {
		_typedRepository: repo,

		async findOne(options) {
			return (await this.findBatch([options]))[0]
		},

		findBatch: async (options) => {
			const queryBuilder = repo.createQueryBuilder("ccl")

			const ids: string[] = []
			const codes: string[] = []

			options.forEach((i) => {
				if (hasProperty(i, "id")) {
					ids.push(i.id)
				} else {
					codes.push(i.code)
				}
			})

			queryBuilder.andWhere(`ccl.${courseClassListColumns.deleted_at.name} is null`)

			if (ids.length) {
				queryBuilder.orWhere(
					`ccl.id in (:...ids)`,
					identity<{ ids: Array<CourseClassListRow["id"]> }>({ ids: [...new Set(ids)] })
				)
			}

			if (codes.length) {
				queryBuilder.orWhere(
					`ccl.code in (:...codes)`,
					identity<{ codes: Array<CourseClassListRow["code"]> }>({ codes: [...new Set(codes)] })
				)
			}

			const courseClassLists = await queryBuilder.getMany()

			return options.map(
				(options) => courseClassLists.find((courseClassList) => is(courseClassList, options)) || null
			)
		},

		findAll: (options) => {
			const queryBuilder = repo.createQueryBuilder("ccl")

			queryBuilder
				.andWhere(
					`ccl.${courseClassListColumns.course_edition_id.name} = :courseEditionId`,
					identity<{ courseEditionId: CourseClassListRow["course_edition_id"] }>({
						courseEditionId: options.courseEditionId,
					})
				)
				.andWhere(`ccl.${courseClassListColumns.deleted_at.name} is null`)

			if (!options.includeDisabled) {
				queryBuilder.andWhere(
					`ccl.${courseClassListColumns.visibility.name} != :v1`,
					identity<{ v1: CourseClassListRow["visibility"] }>({
						v1: "disabled",
					})
				)
			}

			if (!options.includeHidden) {
				queryBuilder.andWhere(
					`ccl.${courseClassListColumns.visibility.name} != :v2`,
					identity<{ v2: CourseClassListRow["visibility"] }>({
						v2: "hidden",
					})
				)
			}

			return queryBuilder.getMany()
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
