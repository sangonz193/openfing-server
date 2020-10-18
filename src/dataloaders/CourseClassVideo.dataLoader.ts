import DataLoader from "dataloader";
import { Connection } from "typeorm";

import { CourseClassVideoRow } from "../entities/CourseClassVideo/CourseClassVideo.entity.types";
import { getCourseClassVideoRepository } from "../repositories/CourseClassVideo";
import {
	CourseClassVideoFindAllOptions,
	CourseClassVideoFindOneOptions,
	CourseClassVideoRepository,
} from "../repositories/CourseClassVideo/CourseClassVideo.repository.types";

export type CourseClassVideoDataLoader = {
	findOne: (options: CourseClassVideoFindOneOptions) => Promise<CourseClassVideoRow | null>;
	findAll: (options: CourseClassVideoFindAllOptions) => Promise<CourseClassVideoRow[]>;

	create: CourseClassVideoRepository["create"];
	save: CourseClassVideoRepository["save"];
};

export const getCourseClassVideoDataLoader = (connection: Connection): CourseClassVideoDataLoader => {
	const repo = getCourseClassVideoRepository(connection);
	const loader = new DataLoader<CourseClassVideoFindOneOptions, CourseClassVideoRow | null>(repo.findBatch);

	const courseClassVideoById = new Map<CourseClassVideoRow["id"], CourseClassVideoRow | null>();

	return {
		findOne: async (options) => {
			const fromCache = courseClassVideoById.get(options.id);

			if (fromCache !== undefined) return fromCache && repo.is(fromCache, options) ? fromCache : null;

			const courseClassVideo = await loader.load(options);
			courseClassVideoById.set(options.id, courseClassVideo);

			return courseClassVideo;
		},

		findAll: async (options) => {
			const courseClassVideos = await repo.findAll(options);

			courseClassVideos.forEach((courseClassVideo) => {
				courseClassVideoById.set(courseClassVideo.id, courseClassVideo);
			});

			return courseClassVideos;
		},

		create: (...args) => repo.create(...args),

		save: async (data) => {
			const newVideo = await repo.save(data);

			courseClassVideoById.set(newVideo.id, newVideo);

			return newVideo;
		},
	};
};
