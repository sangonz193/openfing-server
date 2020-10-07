import { Connection } from "typeorm";

import { getUuid } from "../../_utils/getUuid";
import { identity } from "../../_utils/identity";
import { getTypedRepository } from "../../entities/_utils/getTypedRepository";
import { CourseClassChapterCue, courseClassChapterCueColumns } from "../../entities/CourseClassChapterCue";
import { CourseClassChapterCueRow } from "../../entities/CourseClassChapterCue/CourseClassChapterCue.entity.types";
import { CourseClassChapterCueRepository } from "./CourseClassChapterCue.repository.types";

export const getCourseClassChapterCueRepository = (connection: Connection): CourseClassChapterCueRepository => {
	const repo = getTypedRepository(CourseClassChapterCue, connection);

	const is: CourseClassChapterCueRepository["is"] = (courseClassChapterCue, options) => {
		return courseClassChapterCue.id === options.id && courseClassChapterCue.deletedAt === null;
	};

	return {
		_typedRepository: repo,

		findAll: async (options) => {
			const queryBuilder = repo.createQueryBuilder("cccc");

			queryBuilder
				.andWhere(
					`cccc.${courseClassChapterCueColumns.courseClassId.name} = :courseClassId`,
					identity<{ courseClassId: CourseClassChapterCueRow["courseClassId"] }>({
						courseClassId: options.courseClassId,
					})
				)
				.andWhere(`cccc.${courseClassChapterCueColumns.deletedAt.name} is null`);

			queryBuilder.orderBy(courseClassChapterCueColumns.startSeconds.name, "ASC");

			return queryBuilder.getMany();
		},

		findBatch: async (options) => {
			const queryBuilder = repo.createQueryBuilder("cccc");

			queryBuilder
				.andWhere(`cccc.${courseClassChapterCueColumns.deletedAt.name} is null`)
				.andWhereInIds(identity<Array<CourseClassChapterCueRow["id"]>>(options.map((options) => options.id)));

			const courseClassChapterCues = await queryBuilder.getMany();

			return options.map((options) => courseClassChapterCues.find((cccc) => is(cccc, options)) || null);
		},

		is,

		create: (data) => ({
			...data,
			id: data.id ?? getUuid(),
			createdAt: data.createdAt || new Date(),
			updatedAt: data.updatedAt || null,
			deletedAt: data.deletedAt || null,
			updatedById: data.updatedById || null,
			deletedById: data.deletedById || null,
		}),

		save: (data) => repo.save(data),
	};
};
