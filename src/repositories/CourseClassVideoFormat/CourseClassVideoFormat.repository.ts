import omitBy from "lodash/omitBy";
import { Connection } from "typeorm";

import { identity } from "../../_utils/identity";
import { getTypedRepository } from "../../entities/_utils/getTypedRepository";
import {
	courseClassVideoFormatColumns,
	courseClassVideoFormatEntitySchema,
} from "../../entities/CourseClassVideoFormat";
import { CourseClassVideoFormatRow } from "../../entities/CourseClassVideoFormat/CourseClassVideoFormat.entity.types";
import { createUpdate } from "../_utils/createUpdate";
import { CourseClassVideoFormatRepository } from "./CourseClassVideoFormat.repository.types";

export const getCourseClassVideoFormatRepository = (connection: Connection): CourseClassVideoFormatRepository => {
	const repo = getTypedRepository(courseClassVideoFormatEntitySchema, connection);
	const update = createUpdate(repo);

	const is: CourseClassVideoFormatRepository["is"] = (courseClassVideoFormat, options) => {
		return courseClassVideoFormat.id === options.id && courseClassVideoFormat.deleted_at === null;
	};

	return {
		_typedRepository: repo,

		findAll: (options) => {
			const queryBuilder = repo.createQueryBuilder("ccvf");

			queryBuilder
				.andWhere(
					`ccvf.${courseClassVideoFormatColumns.course_class_video_quality_id.name} = :courseClassVideoQualityId`,
					identity<{ courseClassVideoQualityId: CourseClassVideoFormatRow["course_class_video_quality_id"] }>(
						{
							courseClassVideoQualityId: options.courseClassVideoQualityId,
						}
					)
				)
				.andWhere(`ccvf.${courseClassVideoFormatColumns.deleted_at.name} is null`);

			return queryBuilder.getMany();
		},

		findBatch: async (options) => {
			const queryBuilder = repo.createQueryBuilder("ccvf");

			queryBuilder
				.andWhere(`ccvf.${courseClassVideoFormatColumns.deleted_at.name} is null`)
				.andWhereInIds(identity<Array<CourseClassVideoFormatRow["id"]>>(options.map((options) => options.id)));

			const courseClassVideoFormats = await queryBuilder.getMany();

			return options.map(
				(options) =>
					courseClassVideoFormats.find((courseClassVideoFormat) => is(courseClassVideoFormat, options)) ||
					null
			);
		},

		is,

		create: (data) => ({
			...data,
			created_at: data.created_at || new Date(),
			updated_at: data.updated_at || null,
			deleted_at: data.deleted_at || null,
			updated_by_id: data.updated_by_id || null,
			deleted_by_id: data.deleted_by_id || null,
		}),

		insert: (data) => repo.save(data),

		createAndInsert(...args) {
			return this.insert(this.create(...args));
		},

		async update(id, newValues) {
			const acceptedKeysMap = identity<Record<keyof typeof newValues, true>>({
				created_at: true,
				created_by_id: true,
				deleted_at: true,
				deleted_by_id: true,
				name: true,
				course_class_video_quality_id: true,
				updated_by_id: true,
				url: true,
			});

			return update(id, {
				...omitBy(newValues, (_, key) => {
					return !acceptedKeysMap[key as keyof typeof acceptedKeysMap];
				}),
				updated_at: new Date(),
			});
		},

		delete(id, data) {
			return update(id, {
				deleted_at: new Date(),
				deleted_by_id: data.deleted_by_id,
			});
		},
	};
};
