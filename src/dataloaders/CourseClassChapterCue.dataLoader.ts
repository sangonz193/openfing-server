import DataLoader from "dataloader";
import { Connection } from "typeorm";

import { CourseClassChapterCueRow } from "../entities/CourseClassChapterCue/CourseClassChapterCue.entity.types";
import { getCourseClassChapterCueRepository } from "../repositories/CourseClassChapterCue";
import {
	CourseClassChapterCueFindAllOptions,
	CourseClassChapterCueFindOneOptions,
} from "../repositories/CourseClassChapterCue/CourseClassChapterCue.repository.types";

export type CourseClassChapterCueDataLoader = {
	findOne: (options: CourseClassChapterCueFindOneOptions) => Promise<CourseClassChapterCueRow | null>;
	findAll: (options: CourseClassChapterCueFindAllOptions) => Promise<CourseClassChapterCueRow[]>;
};

export const getCourseClassChapterCueDataLoader = (connection: Connection): CourseClassChapterCueDataLoader => {
	const repo = getCourseClassChapterCueRepository(connection);
	const loader = new DataLoader<CourseClassChapterCueFindOneOptions, CourseClassChapterCueRow | null>(repo.findBatch);

	const courseClassChapterCueById = new Map<CourseClassChapterCueRow["id"], CourseClassChapterCueRow | null>();

	return {
		findOne: async (options) => {
			const fromCache = courseClassChapterCueById.get(options.id);

			if (fromCache !== undefined) return fromCache && repo.is(fromCache, options) ? fromCache : null;

			const courseClassChapterCue = await loader.load(options);
			courseClassChapterCueById.set(options.id, courseClassChapterCue);

			return courseClassChapterCue;
		},

		findAll: async (options) => {
			const courseClassChapterCues = await repo.findAll(options);

			courseClassChapterCues.forEach((courseClassChapterCue) => {
				courseClassChapterCueById.set(courseClassChapterCue.id, courseClassChapterCue);
			});

			return courseClassChapterCues;
		},
	};
};
