import { Brackets, Connection } from "typeorm";

import { hasProperty } from "../../_utils/hasProperty";
import { identity } from "../../_utils/identity";
import { getTypedRepository } from "../../entities/_utils/getTypedRepository";
import { Course, courseColumns, courseRelations, CourseVisibility } from "../../entities/Course";
import { CourseRow } from "../../entities/Course/Course.entity.types";
import { courseEditionColumns, CourseEditionVisibility } from "../../entities/CourseEdition";
import { CourseEditionRow } from "../../entities/CourseEdition/CourseEdition.entity.types";
import { CourseRepository } from "./Course.repository.types";

export const getCourseRepository = (connection: Connection): CourseRepository => {
	const repo = getTypedRepository(Course, connection);

	const is: CourseRepository["is"] = (course, options) => {
		if (hasProperty(options, "id") ? course.id !== options.id : course.code !== options.code) return false;

		return (
			course.deletedAt === null &&
			(options.includeHidden ||
				course.visibility === CourseVisibility.public ||
				options.includeDisabled ||
				course.visibility === CourseVisibility.disabled)
		);
	};

	return {
		_typedRepository: repo,

		findAll: () => {
			const queryBuilder = repo
				.createQueryBuilder("c")
				.addSelect(`count(ce.${courseEditionColumns.id.name})`, `courseEditionsCount`)
				.innerJoin(`c.${courseRelations.courseEditions.name}`, "ce");

			queryBuilder
				.andWhere(`c.${courseColumns.deletedAt.name} is null`)
				.andWhere(
					new Brackets((qb) => {
						qb.orWhere(
							`c.${courseColumns.visibility.name} = :publicVisibility`,
							identity<{ publicVisibility: CourseRow["visibility"] }>({
								publicVisibility: "public",
							})
						);
						qb.orWhere(`c.${courseColumns.visibility.name} is null`);
					})
				)
				.andWhere(
					new Brackets((qb) =>
						qb
							.where(
								`ce.${courseEditionColumns.visibility.name} in (:...ceVisibilities)`,
								identity<{ ceVisibilities: Array<CourseEditionRow["visibility"]> }>({
									ceVisibilities: [CourseEditionVisibility.public],
								})
							)
							.orWhere(`ce.${courseEditionColumns.visibility.name} is null`)
					)
				)
				.orderBy(`c.${courseColumns.name.name}`, "ASC")
				.groupBy(`c.${courseColumns.id.name}`);

			return queryBuilder.getMany();
		},

		findBatch: async (options) => {
			const queryBuilder = repo.createQueryBuilder("c");

			const ids: number[] = [];
			const codes: string[] = [];

			options.forEach((i) => {
				if (hasProperty(i, "id")) ids.push(i.id);
				else codes.push(i.code);
			});

			queryBuilder.andWhere(`c.${courseColumns.deletedAt.name} is null`);

			queryBuilder.andWhere(
				new Brackets((qb) => {
					if (ids.length)
						qb.orWhere(
							`c.id in (:...ids)`,
							identity<{ ids: Array<CourseRow["id"]> }>({ ids: [...new Set(ids)] })
						);

					if (codes.length)
						qb.orWhere(
							`c.code in (:...codes)`,
							identity<{ codes: Array<CourseRow["code"]> }>({ codes: [...new Set(codes)] })
						);
				})
			);

			const result = await queryBuilder.getMany();

			return options.map((options) => result.find((item) => is(item, options)) || null);
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

		save: (course) => repo.save(course),
	};
};
