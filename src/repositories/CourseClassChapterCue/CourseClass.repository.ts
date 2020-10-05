import { Connection } from "typeorm";

import { hasProperty } from "../../_utils/hasProperty";
import { identity } from "../../_utils/identity";
import { getTypedRepository } from "../../entities/_utils/getTypedRepository";
import { CourseClass, courseClassColumns, CourseClassVisibility } from "../../entities/CourseClass";
import { CourseClassRow } from "../../entities/CourseClass/CourseClass.entity.types";
import { CourseClassFindAllOptions, CourseClassRepository } from "./CourseClass.repository.types";

export const getCourseClassRepository = (connection: Connection): CourseClassRepository => {
	const repo = getTypedRepository(CourseClass, connection);

	const is: CourseClassRepository["is"] = (courseClass, options) => {
		return (
			courseClass.id === options.id &&
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

		findAll: async (options) => {
			if (hasProperty(options, "courseClassListId")) return findAllFromCourseClassList(options);

			return findLatestCourseClasses(options);
		},

		findBatch: async (options) => {
			const queryBuilder = repo.createQueryBuilder("ce");

			queryBuilder
				.andWhere(`ce.${courseClassColumns.deletedAt.name} is null`)
				.andWhereInIds(identity<Array<CourseClassRow["id"]>>(options.map((options) => options.id)));

			const courseClasses = await queryBuilder.getMany();

			return options.map((options) => courseClasses.find((ce) => is(ce, options)) || null);
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

		save: (data) => repo.save(data),
	};
};
