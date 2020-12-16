import { Connection } from "typeorm";

import { getUuid } from "../../_utils/getUuid";
import { identity } from "../../_utils/identity";
import { getTypedRepository } from "../../entities/_utils/getTypedRepository";
import {
	courseClassVideoQualityColumns,
	courseClassVideoQualityEntitySchema,
} from "../../entities/CourseClassVideoQuality";
import { CourseClassVideoQualityRow } from "../../entities/CourseClassVideoQuality/CourseClassVideoQuality.entity.types";
import { CourseClassVideoQualityRepository } from "./CourseClassVideoQuality.repository.types";

export const getCourseClassVideoQualityRepository = (connection: Connection): CourseClassVideoQualityRepository => {
	const repo = getTypedRepository(courseClassVideoQualityEntitySchema, connection);

	const is: CourseClassVideoQualityRepository["is"] = (courseClassVideoQuality, options) => {
		return courseClassVideoQuality.id === options.id && courseClassVideoQuality.deleted_at === null;
	};

	return {
		_typedRepository: repo,

		findAll: (options) => {
			const queryBuilder = repo.createQueryBuilder("ccvq");

			queryBuilder
				.andWhere(
					`ccvq.${courseClassVideoQualityColumns.course_class_video_id.name} = :courseClassVideoId`,
					identity<{ courseClassVideoId: CourseClassVideoQualityRow["course_class_video_id"] }>({
						courseClassVideoId: options.courseClassVideoId,
					})
				)
				.andWhere(`ccvq.${courseClassVideoQualityColumns.deleted_at.name} is null`);

			return queryBuilder.getMany();
		},

		findBatch: async (options) => {
			const queryBuilder = repo.createQueryBuilder("ccvq");

			queryBuilder
				.andWhere(`ccvq.${courseClassVideoQualityColumns.deleted_at.name} is null`)
				.andWhereInIds(identity<Array<CourseClassVideoQualityRow["id"]>>(options.map((options) => options.id)));

			const courseClassVideoQualitys = await queryBuilder.getMany();

			return options.map(
				(options) =>
					courseClassVideoQualitys.find((courseClassVideoQuality) => is(courseClassVideoQuality, options)) ||
					null
			);
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
