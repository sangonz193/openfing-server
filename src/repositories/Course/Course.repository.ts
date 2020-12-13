import omitBy from "lodash/omitBy";
import { Brackets, Connection } from "typeorm";

import { hasProperty } from "../../_utils/hasProperty";
import { identity } from "../../_utils/identity";
import { getTypedRepository } from "../../entities/_utils/getTypedRepository";
import { courseColumns, courseEntitySchema } from "../../entities/Course";
import { CourseRow } from "../../entities/Course/Course.entity.types";
import { createUpdate } from "../_utils/createUpdate";
import { CourseRepository } from "./Course.repository.types";

export const getCourseRepository = (connection: Connection): CourseRepository => {
	const repo = getTypedRepository(courseEntitySchema, connection);
	const update = createUpdate(repo);

	const is: CourseRepository["is"] = (course, options) => {
		if (hasProperty(options, "id") ? course.id !== options.id : course.code !== options.code) return false;

		return (
			course.deleted_at === null &&
			(options.includeHidden ||
				course.visibility === "public" ||
				options.includeDisabled ||
				course.visibility === "disabled")
		);
	};

	return {
		_typedRepository: repo,

		findAll: () => {
			const queryBuilder = repo.createQueryBuilder("c");

			queryBuilder.andWhere(`c.${courseColumns.deleted_at.name} is null`);

			queryBuilder.andWhere(
				new Brackets((qb) => {
					qb.orWhere(
						`c.${courseColumns.visibility.name} = :publicVisibility`,
						identity<{ publicVisibility: CourseRow["visibility"] }>({
							publicVisibility: "public",
						})
					);
					qb.orWhere(`c.${courseColumns.visibility.name} is null`);
				})
			);
			queryBuilder.orderBy(courseColumns.name.name, "ASC");

			return queryBuilder.getMany();
		},

		findBatch: async (options) => {
			const queryBuilder = repo.createQueryBuilder("c");

			const ids: number[] = [];
			const codes: string[] = [];

			options.forEach((i) => {
				if (hasProperty(i, "id")) ids.push(i.id);
				else codes.push(i.code);
			});

			queryBuilder.andWhere(`c.${courseColumns.deleted_at.name} is null`);

			queryBuilder.andWhere(
				new Brackets((qb) => {
					if (ids.length)
						qb.orWhere(
							`c.id in (:...ids)`,
							identity<{ ids: Array<CourseRow["id"]> }>({ ids: [...new Set(ids)] })
						);

					if (codes.length)
						qb.orWhere(
							`c.code in (:...codes)`,
							identity<{ codes: Array<CourseRow["code"]> }>({ codes: [...new Set(codes)] })
						);
				})
			);

			const result = await queryBuilder.getMany();

			return options.map((options) => result.find((item) => is(item, options)) || null);
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

		update: async (id, newValues) => {
			const acceptedKeysMap = identity<Record<keyof typeof newValues, true>>({
				created_at: true,
				created_by_id: true,
				deleted_at: true,
				deleted_by_id: true,
				name: true,
				code: true,
				eva: true,
				icon_url: true,
				updated_by_id: true,
				visibility: true,
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
