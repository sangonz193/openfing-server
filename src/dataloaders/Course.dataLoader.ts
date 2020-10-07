import DataLoader from "dataloader";
import { Connection } from "typeorm";

import { hasProperty } from "../_utils/hasProperty";
import { CourseRow } from "../entities/Course/Course.entity.types";
import { getCourseRepository } from "../repositories/Course";
import { CourseFindOneOptions, CourseRepository } from "../repositories/Course/Course.repository.types";

export type CourseDataLoader = {
	findOne: (options: CourseFindOneOptions) => Promise<CourseRow | null>;
	findAll: () => Promise<CourseRow[]>;

	create: CourseRepository["create"];
	save: CourseRepository["save"];
};

export const getCourseDataLoader = (connection: Connection): CourseDataLoader => {
	const repo = getCourseRepository(connection);
	const loader = new DataLoader<CourseFindOneOptions, CourseRow | null>(repo.findBatch);

	const courseById = new Map<CourseRow["id"], CourseRow | null>();
	const courseByCode = new Map<CourseRow["code"], CourseRow | null>();

	return {
		findOne: async (options) => {
			const fromCache = hasProperty(options, "id") ? courseById.get(options.id) : courseByCode.get(options.code);

			if (fromCache !== undefined) return fromCache && repo.is(fromCache, options) ? fromCache : null;

			const course = await loader.load(options);

			if (course) {
				courseById.set(course.id, course);
				courseByCode.set(course.code, course);
			} else if (hasProperty(options, "id")) courseById.set(options.id, null);
			else if (hasProperty(options, "code")) courseByCode.set(options.code, null);

			return course;
		},

		findAll: async () => {
			const courses = await repo.findAll();

			courses.forEach((course) => {
				courseById.set(course.id, course);
				courseByCode.set(course.code, course);
			});

			return courses;
		},

		create: (...args) => repo.create(...args),

		save: async (data) => {
			const newCourse = await repo.save(data);

			courseById.set(newCourse.id, newCourse);
			courseByCode.set(newCourse.code, newCourse);

			return newCourse;
		},
	};
};
