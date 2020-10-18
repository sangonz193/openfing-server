import DataLoader from "dataloader";
import fetch from "node-fetch";
import { Connection } from "typeorm";

import { CourseClassVideoFormatRow } from "../entities/CourseClassVideoFormat/CourseClassVideoFormat.entity.types";
import { getCourseClassVideoFormatRepository } from "../repositories/CourseClassVideoFormat";
import {
	CourseClassVideoFormatFindAllOptions,
	CourseClassVideoFormatFindOneOptions,
	CourseClassVideoFormatRepository,
} from "../repositories/CourseClassVideoFormat/CourseClassVideoFormat.repository.types";

export type CourseClassVideoFormatDataLoader = {
	findOne: (options: CourseClassVideoFormatFindOneOptions) => Promise<CourseClassVideoFormatRow | null>;
	findAll: (options: CourseClassVideoFormatFindAllOptions) => Promise<CourseClassVideoFormatRow[]>;

	hasTorrent: (options: { url: string }) => Promise<boolean>;

	create: CourseClassVideoFormatRepository["create"];
	save: CourseClassVideoFormatRepository["save"];
};

export const getCourseClassVideoFormatDataLoader = (connection: Connection): CourseClassVideoFormatDataLoader => {
	const repo = getCourseClassVideoFormatRepository(connection);
	const loader = new DataLoader<CourseClassVideoFormatFindOneOptions, CourseClassVideoFormatRow | null>(
		repo.findBatch
	);

	const courseClassVideoFormatById = new Map<CourseClassVideoFormatRow["id"], CourseClassVideoFormatRow | null>();
	const hasTorrentByUrl = new Map<string, boolean>();

	return {
		findOne: async (options) => {
			const fromCache = courseClassVideoFormatById.get(options.id);

			if (fromCache !== undefined) return fromCache && repo.is(fromCache, options) ? fromCache : null;

			const courseClassVideoFormat = await loader.load(options);
			courseClassVideoFormatById.set(options.id, courseClassVideoFormat);

			return courseClassVideoFormat;
		},

		findAll: async (options) => {
			const courseClassVideoFormats = await repo.findAll(options);

			courseClassVideoFormats.forEach((courseClassVideoFormat) => {
				courseClassVideoFormatById.set(courseClassVideoFormat.id, courseClassVideoFormat);
			});

			return courseClassVideoFormats;
		},

		hasTorrent: async ({ url }) => {
			const torrentUrl = url + ".torrent";
			const result =
				hasTorrentByUrl.get(url) ??
				(await fetch(torrentUrl)
					.then((e) => e.status !== 404)
					.catch(() => false));

			hasTorrentByUrl.set(url, result);

			return result;
		},

		create: (...args) => repo.create(...args),

		save: async (data) => {
			const newFormat = await repo.save(data);

			courseClassVideoFormatById.set(newFormat.id, newFormat);

			return newFormat;
		},
	};
};
