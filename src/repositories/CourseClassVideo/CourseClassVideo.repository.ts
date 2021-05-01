import { Connection } from "typeorm";

import { getUuid } from "../../_utils/getUuid";
import { identity } from "../../_utils/identity";
import { getTypedRepository } from "../../entities/_utils/getTypedRepository";
import { courseClassVideoColumns, courseClassVideoEntitySchema } from "../../entities/CourseClassVideo";
import { CourseClassVideoRow } from "../../entities/CourseClassVideo/CourseClassVideo.entity.types";
import { CourseClassVideoRepository } from "./CourseClassVideo.repository.types";

export const getCourseClassVideoRepository = (connection: Connection): CourseClassVideoRepository => {
	const repo = getTypedRepository(courseClassVideoEntitySchema, connection);

	const is: CourseClassVideoRepository["is"] = (courseClassVideo, options) => {
		return (
			courseClassVideo.id === options.id &&
			courseClassVideo.deleted_at === null &&
			(options.includeHidden ||
				courseClassVideo.visibility === "public" ||
				options.includeDisabled ||
				courseClassVideo.visibility === "disabled")
		);
	};

	return {
		_typedRepository: repo,

		findAll: (options) => {
			const queryBuilder = repo.createQueryBuilder("ce");

			queryBuilder
				.andWhere(
					`ce.${courseClassVideoColumns.course_class_id.name} = :courseClassId`,
					identity<{ courseClassId: CourseClassVideoRow["course_class_id"] }>({
						courseClassId: options.courseClassId,
					})
				)
				.andWhere(`ce.${courseClassVideoColumns.deleted_at.name} is null`);

			if (!options.includeDisabled)
				queryBuilder.andWhere(
					`ce.${courseClassVideoColumns.visibility.name} != :v1`,
					identity<{ v1: CourseClassVideoRow["visibility"] }>({
						v1: "disabled",
					})
				);

			if (!options.includeHidden)
				queryBuilder.andWhere(
					`ce.${courseClassVideoColumns.visibility.name} != :v2`,
					identity<{ v2: CourseClassVideoRow["visibility"] }>({
						v2: "hidden",
					})
				);

			return queryBuilder.getMany();
		},

		findBatch: async (options) => {
			const queryBuilder = repo.createQueryBuilder("ce");

			queryBuilder
				.andWhere(`ce.${courseClassVideoColumns.deleted_at.name} is null`)
				.andWhereInIds(identity<Array<CourseClassVideoRow["id"]>>(options.map((options) => options.id)));

			const courseClassVideos = await queryBuilder.getMany();

			return options.map((options) => courseClassVideos.find((ce) => is(ce, options)) || null);
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
	};
};
