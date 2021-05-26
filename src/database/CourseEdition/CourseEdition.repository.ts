import { getUuid } from "@sangonz193/utils/getUuid"
import identity from "lodash/identity"
import { Connection } from "typeorm"

import { getTypedRepository } from "../_utils/getTypedRepository"
import { courseEditionColumns, courseEditionEntitySchema } from "./CourseEdition.entity"
import { CourseEditionRow } from "./CourseEdition.entity.types"
import { CourseEditionRepository } from "./CourseEdition.repository.types"

export const getCourseEditionRepository = (connection: Connection): CourseEditionRepository => {
	const repo = getTypedRepository(courseEditionEntitySchema, connection)

	const is: CourseEditionRepository["is"] = (courseEdition, options) => {
		return (
			courseEdition.id === options.id &&
			courseEdition.deleted_at === null &&
			(options.includeHidden ||
				courseEdition.visibility === "public" ||
				options.includeDisabled ||
				courseEdition.visibility === "disabled")
		)
	}

	return {
		_typedRepository: repo,

		findAll: (options) => {
			const queryBuilder = repo.createQueryBuilder("ce")

			queryBuilder
				.andWhere(
					`ce.${courseEditionColumns.course_id.name} = :courseId`,
					identity<{ courseId: CourseEditionRow["course_id"] }>({
						courseId: options.courseId,
					})
				)
				.andWhere(`ce.${courseEditionColumns.deleted_at.name} is null`)

			if (!options.includeDisabled) {
				queryBuilder.andWhere(
					`ce.${courseEditionColumns.visibility.name} != :v1`,
					identity<{ v1: CourseEditionRow["visibility"] }>({
						v1: "disabled",
					})
				)
			}

			if (!options.includeHidden) {
				queryBuilder.andWhere(
					`ce.${courseEditionColumns.visibility.name} != :v2`,
					identity<{ v2: CourseEditionRow["visibility"] }>({
						v2: "hidden",
					})
				)
			}

			return queryBuilder.getMany()
		},

		findBatch: async (options) => {
			const queryBuilder = repo.createQueryBuilder("ce")

			queryBuilder
				.andWhere(`ce.${courseEditionColumns.deleted_at.name} is null`)
				.whereInIds(identity<Array<CourseEditionRow["id"]>>(options.map((o) => o.id)))

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

		save: (data) => repo.save(data),
	}
}
