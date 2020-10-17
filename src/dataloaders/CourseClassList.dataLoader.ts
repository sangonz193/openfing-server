import DataLoader from "dataloader";
import { Connection } from "typeorm";

import { hasProperty } from "../_utils/hasProperty";
import { CourseClassListRow } from "../entities/CourseClassList/CourseClassList.entity.types";
import { getCourseClassListRepository } from "../repositories/CourseClassList";
import {
	CourseClassListFindAllOptions,
	CourseClassListFindOneOptions,
	CourseClassListRepository,
} from "../repositories/CourseClassList/CourseClassList.repository.types";

export type CourseClassListDataLoader = {
	findOne: (options: CourseClassListFindOneOptions) => Promise<CourseClassListRow | null>;
	findAll: (options: CourseClassListFindAllOptions) => Promise<CourseClassListRow[]>;

	create: CourseClassListRepository["create"];
	save: CourseClassListRepository["save"];
};

export const getCourseClassListDataLoader = (connection: Connection): CourseClassListDataLoader => {
	const repo = getCourseClassListRepository(connection);
	const loader = new DataLoader<CourseClassListFindOneOptions, CourseClassListRow | null>(repo.findBatch);

	const courseClassListById = new Map<CourseClassListRow["id"], CourseClassListRow | null>();
	const courseClassListByCode = new Map<CourseClassListRow["code"], CourseClassListRow | null>();

	return {
		findOne: async (options) => {
			const fromCache = hasProperty(options, "id")
				? courseClassListById.get(options.id)
				: courseClassListByCode.get(options.code);

			if (fromCache !== undefined) return fromCache && repo.is(fromCache, options) ? fromCache : null;

			const courseClassList = await loader.load(options);

			if (courseClassList) {
				courseClassListById.set(courseClassList.id, courseClassList);
				courseClassListByCode.set(courseClassList.code, courseClassList);
			} else if (hasProperty(options, "id")) courseClassListById.set(options.id, null);
			else if (hasProperty(options, "code")) courseClassListByCode.set(options.code, null);

			return courseClassList;
		},

		findAll: async (options) => {
			const courseClassLists = await repo.findAll(options);

			courseClassLists.forEach((courseClassList) => {
				courseClassListById.set(courseClassList.id, courseClassList);
				courseClassListByCode.set(courseClassList.code, courseClassList);
			});

			return courseClassLists;
		},

		create: (...args) => repo.create(...args),

		save: async (data) => {
			const newCourseClassList = await repo.save(data);

			courseClassListById.set(newCourseClassList.id, newCourseClassList);
			courseClassListByCode.set(newCourseClassList.code, newCourseClassList);

			return newCourseClassList;
		},
	};
};
