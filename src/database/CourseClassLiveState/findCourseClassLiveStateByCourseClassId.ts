import DataLoader from "dataloader"
import identity from "lodash/identity"
import { Connection } from "typeorm"

import { courseClassLiveStateColumns, courseClassLiveStateEntitySchema } from "./CourseClassLiveState.entity"
import { CourseClassLiveStateRow } from "./CourseClassLiveState.entity.types"

export type FindCourseClassLiveStateByCourseClassIdBatchOptions = {
	connection: Connection
	courseClassIds: readonly string[]
}

export async function findCourseClassLiveStateByCourseClassIdBatch(
	options: FindCourseClassLiveStateByCourseClassIdBatchOptions
): Promise<Array<CourseClassLiveStateRow | null>> {
	const { connection, courseClassIds } = options
	const rows = await connection
		.createQueryBuilder<CourseClassLiveStateRow>(courseClassLiveStateEntitySchema, "liveState")
		.where(
			`liveState.${courseClassLiveStateColumns.course_class_id.name} in (:...ids)`,
			identity<{ ids: Array<CourseClassLiveStateRow["course_class_id"]> }>({ ids: [...courseClassIds] })
		)
		.getMany()

	return courseClassIds.map((id) => {
		return rows.find((row) => row.course_class_id === id) ?? null
	})
}

export function getFindCourseClassLiveStateByCourseClassIdBatchDataLoader(connection: Connection) {
	return new DataLoader<string, CourseClassLiveStateRow | null>(
		(courseClassIds) =>
			findCourseClassLiveStateByCourseClassIdBatch({
				connection,
				courseClassIds,
			}),
		{
			cache: false,
		}
	)
}
