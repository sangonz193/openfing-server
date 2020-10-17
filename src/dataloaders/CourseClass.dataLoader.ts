import DataLoader from "dataloader";
import { Connection } from "typeorm";

import { CourseClassRow } from "../entities/CourseClass/CourseClass.entity.types";
import { getCourseClassRepository } from "../repositories/CourseClass";
import {
	CourseClassFindAllOptions,
	CourseClassFindOneOptions,
	CourseClassRepository,
} from "../repositories/CourseClass/CourseClass.repository.types";

export type CourseClassDataLoader = {
	findOne: (options: CourseClassFindOneOptions) => Promise<CourseClassRow | null>;
	findAll: (options: CourseClassFindAllOptions) => Promise<CourseClassRow[]>;

	create: CourseClassRepository["create"];
	save: CourseClassRepository["save"];
};

export const getCourseClassDataLoader = (connection: Connection): CourseClassDataLoader => {
	const repo = getCourseClassRepository(connection);
	const loader = new DataLoader<CourseClassFindOneOptions, CourseClassRow | null>(repo.findBatch);

	const courseClassById = new Map<CourseClassRow["id"], CourseClassRow | null>();

	return {
		findOne: async (options) => {
			const courseClass = await loader.load(options);

			courseClassById.set(options.id, courseClass);

			return courseClass;
		},

		findAll: async (options) => {
			const courseClasses = await repo.findAll(options);

			courseClasses.forEach((courseClass) => {
				courseClassById.set(courseClass.id, courseClass);
			});

			return courseClasses;
		},

		create: (...args) => repo.create(...args),

		save: async (data) => {
			const newCourseClass = await repo.save(data);

			courseClassById.set(newCourseClass.id, newCourseClass);

			return newCourseClass;
		},
	};
};
