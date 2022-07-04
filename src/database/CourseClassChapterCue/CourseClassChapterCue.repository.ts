import { getUuid } from "@sangonz193/utils/getUuid"
import identity from "lodash/identity"
import { Pool } from "pg"
import { Connection } from "typeorm"

import { getTypedRepository } from "../_utils/getTypedRepository"
import { courseClassChapterCueColumns, courseClassChapterCueEntitySchema } from "./CourseClassChapterCue.entity"
import { CourseClassChapterCueRow } from "./CourseClassChapterCue.entity.types"
import { CourseClassChapterCueRepository } from "./CourseClassChapterCue.repository.types"
import { deleteCourseClassChapterCuesByCourseClassId } from "./deleteCourseClassChapterCuesByCourseClassId"

export function getCourseClassChapterCueRepository(context: {
	pool: Pool
	connection: Connection
}): CourseClassChapterCueRepository {
	const { pool, connection } = context
	const repo = getTypedRepository(courseClassChapterCueEntitySchema, connection)

	const is: CourseClassChapterCueRepository["is"] = (courseClassChapterCue, options) => {
		return courseClassChapterCue.id === options.id && courseClassChapterCue.deleted_at === null
	}

	return {
		_typedRepository: repo,

		findAll: async (options) => {
			const queryBuilder = repo.createQueryBuilder("cccc")

			queryBuilder
				.andWhere(
					`cccc.${courseClassChapterCueColumns.course_class_id.name} = :courseClassId`,
					identity<{ courseClassId: CourseClassChapterCueRow["course_class_id"] }>({
						courseClassId: options.courseClassId,
					})
				)
				.andWhere(`cccc.${courseClassChapterCueColumns.deleted_at.name} is null`)

			queryBuilder.orderBy(courseClassChapterCueColumns.start_seconds.name, "ASC")

			return queryBuilder.getMany()
		},

		findBatch: async (options) => {
			const queryBuilder = repo.createQueryBuilder("cccc")

			queryBuilder
				.andWhere(`cccc.${courseClassChapterCueColumns.deleted_at.name} is null`)
				.andWhereInIds(identity<Array<CourseClassChapterCueRow["id"]>>(options.map((options) => options.id)))

			const courseClassChapterCues = await queryBuilder.getMany()

			return options.map((options) => courseClassChapterCues.find((cccc) => is(cccc, options)) || null)
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

		deleteByCourseClassId: (courseClassId) =>
			deleteCourseClassChapterCuesByCourseClassId({ courseClassId }, { pool }),
	}
}
