import { Brackets, Connection } from "typeorm";

import { hasProperty } from "../../_utils/hasProperty";
import { identity } from "../../_utils/identity";
import { getTypedRepository } from "../../entities/_utils/getTypedRepository";
import { CourseClass, courseClassColumns, CourseClassVisibility } from "../../entities/CourseClass";
import { CourseClassRow } from "../../entities/CourseClass/CourseClass.entity.types";
import {
	CourseClassFindAllOptions,
	CourseClassFindOneOptions,
	CourseClassRepository,
} from "./CourseClass.repository.types";

export const getCourseClassRepository = (connection: Connection): CourseClassRepository => {
	const repo = getTypedRepository(CourseClass, connection);

	const is: CourseClassRepository["is"] = (courseClass, options) => {
		return (
			(hasProperty(options, "id")
				? courseClass.id === options.id
				: courseClass.courseClassListId === options.courseClassListId &&
				  courseClass.number === options.number) &&
			courseClass.deletedAt === null &&
			(options.includeHidden ||
				courseClass.visibility === CourseClassVisibility.public ||
				options.includeDisabled ||
				courseClass.visibility === CourseClassVisibility.disabled)
		);
	};

	const findAllFromCourseClassList = (
		options: Extract<CourseClassFindAllOptions, { courseClassListId: CourseClassRow["courseClassListId"] }>
	) => {
		const queryBuilder = repo.createQueryBuilder("ce");

		queryBuilder
			.andWhere(
				`ce.${courseClassColumns.courseClassListId.name} = :courseClassListId`,
				identity<{ courseClassListId: CourseClassRow["courseClassListId"] }>({
					courseClassListId: options.courseClassListId,
				})
			)
			.andWhere(`ce.${courseClassColumns.deletedAt.name} is null`);

		if (!options.includeDisabled)
			queryBuilder.andWhere(
				`ce.${courseClassColumns.visibility.name} != :visibility`,
				identity<{ visibility: CourseClassRow["visibility"] }>({
					visibility: CourseClassVisibility.disabled,
				})
			);

		if (!options.includeHidden)
			queryBuilder.andWhere(
				`ce.${courseClassColumns.visibility.name} != :visibility`,
				identity<{ visibility: CourseClassRow["visibility"] }>({
					visibility: CourseClassVisibility.hidden,
				})
			);

		queryBuilder.orderBy(courseClassColumns.number.name, "ASC");

		return queryBuilder.getMany();
	};

	const findLatestCourseClasses = (options: Extract<CourseClassFindAllOptions, { latest: number }>) => {
		return repo.find({
			where: {
				deletedAt: null,
				visibility: CourseClassVisibility.public,
			},
			order: {
				createdAt: "DESC",
			},
			take: options.latest,
		});
	};

	return {
		_typedRepository: repo,

		async findOne(options) {
			return (await this.findBatch([options]))[0];
		},

		findBatch: async (options) => {
			const queryBuilder = repo.createQueryBuilder("cc");

			queryBuilder.andWhere(`cc.${courseClassColumns.deletedAt.name} is null`).andWhere(
				new Brackets((qb) => {
					const ids: Array<CourseClassRow["id"]> = [];
					const byNumber: Array<Extract<CourseClassFindOneOptions, { number: number }>> = [];

					options.forEach((options) => {
						if (hasProperty(options, "id")) ids.push(options.id);
						else byNumber.push(options);
					});

					if (ids.length > 0) qb.whereInIds(ids);

					byNumber.forEach((byNumberOptions) => {
						qb.orWhere(
							new Brackets((qb) =>
								qb
									.where(
										`ce.${courseClassColumns.courseClassListId.name} = :courseClassListId`,
										identity<{ courseClassListId: CourseClassRow["courseClassListId"] }>({
											courseClassListId: byNumberOptions.courseClassListId,
										})
									)
									.andWhere(
										`ce.${courseClassColumns.number.name} = :number`,
										identity<{ number: CourseClassRow["number"] }>({
											number: byNumberOptions.number,
										})
									)
							)
						);
					});
				})
			);

			const courseClasses = await queryBuilder.getMany();

			return options.map((options) => courseClasses.find((cc) => is(cc, options)) || null);
		},

		findAll: async (options) => {
			if (hasProperty(options, "courseClassListId")) return findAllFromCourseClassList(options);

			return findLatestCourseClasses(options);
		},

		is,

		create: (data) => ({
			...data,
			createdAt: data.createdAt || new Date(),
			updatedAt: data.updatedAt || null,
			deletedAt: data.deletedAt || null,
			updatedById: data.updatedById || null,
			deletedById: data.deletedById || null,
		}),

		insert: (data) => repo.save(data),

		createAndInsert(...args) {
			return this.insert(this.create(...args));
		},

		async update(id, newValues) {
			return repo.save({ ...newValues, id });
		},

		delete(id, data) {
			return this.update(id, {
				deletedAt: new Date(),
				deletedById: data.deletedById,
			});
		},
	};
};
