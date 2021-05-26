import { getUuid } from "@sangonz193/utils/getUuid"
import { hasProperty } from "@sangonz193/utils/hasProperty"
import identity from "lodash/identity"
import omitBy from "lodash/omitBy"
import { Brackets, Connection } from "typeorm"

import { createUpdate } from "../_utils/createUpdate"
import { getTypedRepository } from "../_utils/getTypedRepository"
import { courseClassListColumns } from "../CourseClassList"
import { CourseClassListRow } from "../CourseClassList/CourseClassList.entity.types"
import { courseClassColumns, courseClassEntitySchema, courseClassRelations } from "./CourseClass.entity"
import { CourseClassRow } from "./CourseClass.entity.types"
import {
	CourseClassFindAllOptions,
	CourseClassFindOneOptions,
	CourseClassRepository,
} from "./CourseClass.repository.types"

export const getCourseClassRepository = (connection: Connection): CourseClassRepository => {
	const repo = getTypedRepository(courseClassEntitySchema, connection)
	const update = createUpdate(repo)

	const is: CourseClassRepository["is"] = (courseClass, options) => {
		return (
			(hasProperty(options, "id")
				? courseClass.id === options.id
				: courseClass.course_class_list_id === options.courseClassListId &&
				  courseClass.number === options.number) &&
			courseClass.deleted_at === null &&
			(courseClass.visibility === "public" ||
				courseClass.visibility === null ||
				(!!options.includeHidden && courseClass.visibility === "hidden") ||
				(!!options.includeDisabled && courseClass.visibility === "disabled"))
		)
	}

	const findAllFromCourseClassList = (
		options: Extract<CourseClassFindAllOptions, { courseClassListId: CourseClassRow["course_class_list_id"] }>
	) => {
		const queryBuilder = repo.createQueryBuilder("courseClass")

		queryBuilder
			.andWhere(
				`courseClass.${courseClassColumns.course_class_list_id.name} = :courseClassListId`,
				identity<{ courseClassListId: CourseClassRow["course_class_list_id"] }>({
					courseClassListId: options.courseClassListId,
				})
			)
			.andWhere(`courseClass.${courseClassColumns.deleted_at.name} is null`)

		if (!options.includeDisabled) {
			queryBuilder.andWhere(
				`courseClass.${courseClassColumns.visibility.name} != :v1`,
				identity<{ v1: CourseClassRow["visibility"] }>({
					v1: "disabled",
				})
			)
		}

		if (!options.includeHidden) {
			queryBuilder.andWhere(
				`courseClass.${courseClassColumns.visibility.name} != :v2`,
				identity<{ v2: CourseClassRow["visibility"] }>({
					v2: "hidden",
				})
			)
		}

		queryBuilder.orderBy(courseClassColumns.number.name, "ASC")

		return queryBuilder.getMany()
	}

	const findLatestCourseClasses = (options: Extract<CourseClassFindAllOptions, { latest: number }>) => {
		return repo
			.createQueryBuilder("courseClass")
			.leftJoin(`courseClass.${courseClassRelations.courseClassList.name}`, "courseClassList")
			.where(`courseClass.${courseClassColumns.deleted_at.name} is null`)
			.andWhere(
				new Brackets((qb) =>
					qb.where(`courseClass.${courseClassColumns.visibility.name} is null`).orWhere(
						`courseClass.${courseClassColumns.visibility.name} = :v1`,
						identity<{ v1: CourseClassRow["visibility"] }>({
							v1: "public",
						})
					)
				)
			)
			.andWhere(`courseClassList.${courseClassListColumns.deleted_at.name} is null`)
			.andWhere(
				new Brackets((qb) =>
					qb.where(`courseClassList.${courseClassListColumns.visibility.name} is null`).orWhere(
						`courseClassList.${courseClassListColumns.visibility.name} = :v2`,
						identity<{ v2: CourseClassListRow["visibility"] }>({
							v2: "public",
						})
					)
				)
			)
			.orderBy(`courseClass.${courseClassColumns.published_at.name}`, "DESC")
			.take(options.latest)
			.getMany()
	}

	return {
		_typedRepository: repo,

		async findOne(options) {
			return (await this.findBatch([options]))[0]
		},

		findBatch: async (options) => {
			const queryBuilder = repo.createQueryBuilder("cc")

			queryBuilder.andWhere(`cc.${courseClassColumns.deleted_at.name} is null`).andWhere(
				new Brackets((qb) => {
					const ids: Array<CourseClassRow["id"]> = []
					const byNumber: Array<Extract<CourseClassFindOneOptions, { number: number }>> = []

					options.forEach((options) => {
						if (hasProperty(options, "id")) {
							ids.push(options.id)
						} else {
							byNumber.push(options)
						}
					})

					if (ids.length > 0) {
						qb.whereInIds(ids)
					}

					byNumber.forEach((byNumberOptions) => {
						qb.orWhere(
							new Brackets((qb) =>
								qb
									.where(
										`cc.${courseClassColumns.course_class_list_id.name} = :courseClassListId`,
										identity<{ courseClassListId: CourseClassRow["course_class_list_id"] }>({
											courseClassListId: byNumberOptions.courseClassListId,
										})
									)
									.andWhere(
										`cc.${courseClassColumns.number.name} = :number`,
										identity<{ number: CourseClassRow["number"] }>({
											number: byNumberOptions.number,
										})
									)
							)
						)
					})
				})
			)

			const courseClasses = await queryBuilder.getMany()

			return options.map((options) => courseClasses.find((cc) => is(cc, options)) || null)
		},

		findAll: async (options) => {
			if (hasProperty(options, "courseClassListId")) {
				return findAllFromCourseClassList(options)
			}

			return findLatestCourseClasses(options)
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
			const acceptedKeysMap = identity<Record<keyof typeof newValues, true>>({
				course_class_list_id: true,
				created_at: true,
				created_by_id: true,
				deleted_at: true,
				deleted_by_id: true,
				name: true,
				number: true,
				published_at: true,
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
